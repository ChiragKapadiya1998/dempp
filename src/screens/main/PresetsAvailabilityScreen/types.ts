import { AvailabilitySettings } from '../../../ducks/user/types';

export type TimeKey = keyof Pick<AvailabilitySettings, 'startTime' | 'endTime'>;
