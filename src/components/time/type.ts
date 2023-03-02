import { date } from "@ue/utils";

export interface Props {
  value: date.DateValue;
  date: boolean | undefined;
  format: string;
};

export interface DeliveryProps extends Props {
  interval?: number;
}