import moment from "moment";
import "moment/locale/da";
import "moment-timezone";

moment.locale("da");

export const relativeTime = (timestamp) => {
  const date = moment(timestamp).tz("Europe/Copenhagen");
  return date.fromNow();
};
