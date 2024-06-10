
import store from "../store";

export type IRootStoreType = ReturnType<typeof store.getState>;

export type CalendarPropsType = {
  startMonth?: string;
  endMonth?: string;
};
export type WeeksType = Array<Date[]>;
export type WeeksPropsType = { weeks: Array<Date[]> };
export type PaginateButtonType = {
  type: string;
};
