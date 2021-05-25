import moment from "moment";

export const getTimeNow = () => {
  return moment().utcOffset("+0700").format("lll");
};

export const getTimeRelative = (time) => {
  return moment(time, "lll").startOf("milliseconds").fromNow();
};
