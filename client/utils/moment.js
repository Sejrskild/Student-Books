import moment from "moment";
import "moment/locale/da";
import "moment-timezone";

moment.locale("da");

moment.updateLocale("da", {
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "1 sekund",
    ss: "%d sek",
    m: "1 minut",
    mm: "%d min",
    h: "1 time",
    hh: "%d timer",
    d: "1 dag",
    dd: "%d dage",
    M: "1 måned",
    MM: "%d måneder",
    y: "1 år",
    yy: "%d år",
  },
});

export const relativeTime = (timestamp) => {
  const date = moment(timestamp).tz("Europe/Copenhagen");
  return date.fromNow();
};
