import {
  RTCPeerConnection,
  RTCPeerConnectionConfiguration,
} from 'react-native-webrtc';

export const peerConnectionConfiguration: RTCPeerConnectionConfiguration = {
  iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
};

export const PeerConnection = new RTCPeerConnection(
  peerConnectionConfiguration,
);
