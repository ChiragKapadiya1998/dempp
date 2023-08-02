import { Colors } from '../styles';

export type Reason = {
  value: string;
  label: any;
};
export type Reason1 = {
  id: number;
  value: string;
  label: any;
};
export type Reason11 = {
  id: number;
  value: string;
  icon: string;
  subValue: string;
  data: Object;
  rightIcon: boolean;
  isViewVisible: boolean;
};
export type startReason = {
  id: number;
};

export type HelpReason = {
  title: string;
  subTitle: string;
};
export type appStartInfoReason = {
  id: number;
  color: any;
};
export type appStartInfoDummyReason = {
  id: number;
  name: string;
};
export const reasons: Reason[] = [
  { value: 'abuse', label: 'Abuse' },
  { value: 'aggressive-behaviour', label: 'Aggressive behaviour' },
  { value: 'fake-user', label: 'Fake user' },
  { value: 'harsh-language', label: 'Harsh language' },
  { value: 'inappropriate', label: 'Inappropriate' },
  { value: 'placeholder', label: 'Placeholder' },
  { value: 'off-topic', label: 'Off-topic' },
  { value: 'scam', label: 'Scam' },
  { value: 'spam', label: 'Spam' },
];

export const AllHistory: Reason[] = [
  { value: 'all', label: 'All' },
  { value: 'answered', label: 'Answered' },
  { value: 'unanswered', label: 'Unanswered' },
  { value: 'disconnected', label: 'Disconnected' },
  { value: 'closed', label: 'Closed' },
];
export const AllCallHistory: Reason[] = [
  { value: 'all', label: 'All' },
  { value: 'answered', label: 'Answered' },
  { value: 'missed', label: 'Missed' },
  { value: 'closed', label: 'Closed' },
  { value: 'declined', label: 'Declined' },
  { value: 'disconnected', label: 'Disconnected' },
];

export const userData: Reason1[] = [
  { id: 1, value: 'all', label: 'Comedy' },
  { id: 2, value: 'Answered', label: 'Movies' },
  { id: 3, value: 'Missed', label: 'Variety' },
];

export const userStatus: Reason11[] = [
  { id: 1, icon: 'chatty-icon', value: 'Chatty', data: {}, subValue: '', rightIcon: false, isViewVisible: false },
  {
    id: 2,
    icon: 'do-not-disturb-icon',
    value: 'do not disturb',
    subValue: '',
    data: [
      { key: 2, label: 'Off for 2h' },
      { key: 4, label: 'Off for 4h' },
      { key: 8, label: 'Off for 8h' },
      { key: 24, label: 'Off for 24h' },
    ],
    rightIcon: true,
    isViewVisible: false,
  },
  { id: 3, icon: 'call-normal-icon', value: 'Normal', subValue: 'Max. 15 queries', data: {}, rightIcon: true, isViewVisible: false },
];
export const startData: startReason[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const GeneralquestionsData: HelpReason[] = [
  {
    title: 'How to use Parlapp?',
    subTitle:
      'To start using Parlapp please type into the Search field your Query (sentence or key words). Based on the Query you will get a set of Know Hows. Please select at least 1 appropriate Know How for your case, or add a new one. Parlapp will use this info to match you with a professional who might help with your Query.',
  },
  {
    title: 'How long it takes to get on the call?',
    subTitle:
      'To start using Parlapp please type into the Search field your Query (sentence or key words). Based on the Query you will get a set of Know Hows. Please select at least 1 appropriate Know How for your case, or add a new one. Parlapp will use this info to match you with a professional who might help with your Query.',
  },
  {
    title: 'How Parlapp finds the best match to contact?',
    subTitle:
      'To start using Parlapp please type into the Search field your Query (sentence or key words). Based on the Query you will get a set of Know Hows. Please select at least 1 appropriate Know How for your case, or add a new one. Parlapp will use this info to match you with a professional who might help with your Query.',
  },
  {
    title: 'Why I can’t get on the call?',
    subTitle:
      'To start using Parlapp please type into the Search field your Query (sentence or key words). Based on the Query you will get a set of Know Hows. Please select at least 1 appropriate Know How for your case, or add a new one. Parlapp will use this info to match you with a professional who might help with your Query.',
  },
];
export const SettingsquestionsData: HelpReason[] = [
  {
    title: 'How to use Parlapp?',
    subTitle:
      'To start using Parlapp please type into the Search field your Query (sentence or key words). Based on the Query you will get a set of Know Hows. Please select at least 1 appropriate Know How for your case, or add a new one. Parlapp will use this info to match you with a professional who might help with your Query.',
  },
  {
    title: 'Placeholder',
    subTitle: '',
  },
  {
    title: 'Placeholder',
    subTitle: '',
  },
];
export const SetupquestionsData: HelpReason[] = [
  {
    title: 'Placeholder',
    subTitle: '',
  },
  {
    title: 'Placeholder',
    subTitle: '',
  },
];
export const appStartInfoData: appStartInfoReason[] = [
  {
    id: 1,
    color: Colors.accent9,
  },
  {
    id: 2,
    color: Colors.accent10,
  },
  {
    id: 3,
    color: Colors.accent8,
  },
  {
    id: 4,
    color: Colors.accent9,
  },
  // {
  //   id: 5,
  //   color: Colors.accent10,
  // },
];

export const appInfoData: appStartInfoReason[] = [
  {
    id: 1,
    color: Colors.accent9,
  },
  {
    id: 2,
    color: Colors.accent10,
  },
  {
    id: 3,
    color: Colors.accent8,
  },
];
export const appInfoDataDummy: appStartInfoDummyReason[] = [
  {
    id: 1,
    name: 'pie',
  },
  {
    id: 2,
    name: 'cook',
  },
  {
    id: 3,
    name: 'traditions',
  },
  {
    id: 4,
    name: 'recepie',
  },
  {
    id: 5,
    name: '+ Add',
  },
];
