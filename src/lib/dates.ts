import * as dateFns from "date-fns";

export function formatToday(value: Date | string | number) {
  return dateFns.format(value, "EEEE, LLLL do");
}

export function formatTimestamp(value: Date | string | number) {
  return dateFns.format(value, "EEEE, LLLL do yyyy");
}
