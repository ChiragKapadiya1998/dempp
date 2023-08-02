export type HistoryProps = 'passion';

export type TabQueries = {
  tabQueries: number;
  onPress(params: any): void;
  count?: number;
};

export type DropDownDateType = {
  isSelectValue: string;
  setIsSelectValue(params: any): void;
  tabQueries: number;
  open: boolean;
  setOpen(params: any): void;
};
export type QueriesCallHistoryType = {
  tabQueries: number;
  count?: number;
  openQueriesModal(params: any): void;
  finalData: any;
  index: number;
};
