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
export type TodoPropsType = {
  date: Date;
};
export type TodosElementType = {
  date: Date;
  user: string;
  text: {
    checked: boolean;
    id: number;
    text: string;
  };
};

export type TextType = {
  checked: boolean;
  id: number;
  text: string;
};
