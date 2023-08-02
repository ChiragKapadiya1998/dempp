import EventTarget from 'event-target-shim';
import { NativeModules, NativeEventEmitter } from 'react-native';
import base64 from 'base64-js';

export type RTCDataChannelState = 'connecting' | 'open' | 'closing' | 'closed';
export type RTCDataChannelHandlerEvent = {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: RTCDataChannel;
  data: any;
  eventPhase: number;
  isTrusted: boolean;
  target: RTCDataChannel;
  timeStamp: number;
  type: 'message';
};

const DATA_CHANNEL_EVENTS = [
  'open',
  'message',
  'bufferedamountlow',
  'closing',
  'close',
  'error',
];

const { WebRTCModule } = NativeModules;
const EventEmitter = new NativeEventEmitter(WebRTCModule);

class MessageEvent {
  type: string;
  // @ts-ignore
  data: string | ArrayBuffer | Blob;
  // @ts-ignore
  origin: string;
  constructor(type: string, eventInitDict: Object) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}

class RTCDataChannelEvent {
  type: string;
  // @ts-ignore
  channel: RTCDataChannel;
  constructor(type: string, eventInitDict: Object) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}

export default class RTCDataChannel extends EventTarget(DATA_CHANNEL_EVENTS) {
  _peerConnectionId: number;
  _reactTag: string;

  _id: number;
  _label: string;
  _maxPacketLifeTime: number;
  _maxRetransmits: number;
  _negotiated: boolean;
  _ordered: boolean;
  _protocol: string;
  _readyState: RTCDataChannelState;

  binaryType: 'arraybuffer' = 'arraybuffer'; // we only support 'arraybuffer'
  bufferedAmount: number = 0;
  bufferedAmountLowThreshold: number = 0;

  onopen: Function | null | undefined;
  // @ts-ignore
  onmessage: Function | null | undefined;
  onbufferedamountlow: Function | null | undefined;
  onerror: Function | null | undefined;
  onclose: Function | null | undefined;

  constructor(info: any) {
    super();

    this._peerConnectionId = info.peerConnectionId;
    this._reactTag = info.reactTag;

    this._label = info.label;
    this._id = info.id === -1 ? null : info.id; // null until negotiated.
    this._ordered = Boolean(info.ordered);
    this._maxPacketLifeTime = info.maxPacketLifeTime;
    this._maxRetransmits = info.maxRetransmits;
    this._protocol = info.protocol || '';
    this._negotiated = Boolean(info.negotiated);
    this._readyState = info.readyState;

    this._registerEvents();
  }

  get label(): string {
    return this._label;
  }

  get id(): number {
    return this._id;
  }

  get ordered(): boolean {
    return this._ordered;
  }

  get maxPacketLifeTime(): number {
    return this._maxPacketLifeTime;
  }

  get maxRetransmits(): number {
    return this._maxRetransmits;
  }

  get protocol(): string {
    return this._protocol;
  }

  get negotiated(): boolean {
    return this._negotiated;
  }

  get readyState(): string {
    return this._readyState;
  }

  send(data: string | ArrayBuffer | ArrayBufferView) {
    if (typeof data === 'string') {
      WebRTCModule.dataChannelSend(
        this._peerConnectionId,
        this._reactTag,
        data,
        'text',
      );
      return;
    }

    // Safely convert the buffer object to an Uint8Array for base64-encoding
    if (ArrayBuffer.isView(data)) {
      data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    } else if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    } else {
      throw new TypeError(
        'Data must be either string, ArrayBuffer, or ArrayBufferView',
      );
    }
    WebRTCModule.dataChannelSend(
      this._peerConnectionId,
      this._reactTag,
      // @ts-ignore
      base64.fromByteArray(data),
      'binary',
    );
  }

  close() {
    if (this._readyState === 'closing' || this._readyState === 'closed') {
      return;
    }
    WebRTCModule.dataChannelClose(this._peerConnectionId, this._reactTag);
  }

  _unregisterEvents() {
    // @ts-ignore
    this._subscriptions.forEach((e) => e.remove());
    // @ts-ignore
    this._subscriptions = [];
  }

  _registerEvents() {
    // @ts-ignore
    this._subscriptions = [
      EventEmitter.addListener('dataChannelStateChanged', (ev) => {
        if (ev.reactTag !== this._reactTag) {
          return;
        }
        this._readyState = ev.state;
        if (this._id === null && ev.id !== -1) {
          this._id = ev.id;
        }
        if (this._readyState === 'open') {
          this.dispatchEvent(
            new RTCDataChannelEvent('open', { channel: this }),
          );
        } else if (this._readyState === 'closing') {
          this.dispatchEvent(
            new RTCDataChannelEvent('closing', { channel: this }),
          );
        } else if (this._readyState === 'closed') {
          this.dispatchEvent(
            new RTCDataChannelEvent('close', { channel: this }),
          );
          this._unregisterEvents();
          WebRTCModule.dataChannelDispose(
            this._peerConnectionId,
            this._reactTag,
          );
        }
      }),
      EventEmitter.addListener('dataChannelReceiveMessage', (ev) => {
        if (ev.reactTag !== this._reactTag) {
          return;
        }
        let data = ev.data;
        if (ev.type === 'binary') {
          data = base64.toByteArray(ev.data).buffer;
        }
        this.dispatchEvent(new MessageEvent('message', { data }));
      }),
    ];
  }
}
