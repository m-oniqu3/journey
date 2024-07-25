export function timeSince(date: Date): string {
  // get the difference in seconds
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { name: "year", time: 31536000, type: "yr" },
    { name: "month", time: 2592000, type: "mon" },
    { name: "week", time: 604800, type: "wk" },
    { name: "day", time: 86400, type: "day" },
    { name: "hour", time: 3600, type: "hr" },
    { name: "minute", time: 60, type: "min" },
  ];

  let intervalType: string = "";
  let timePassed: number = 0;

  for (const interval of intervals) {
    timePassed = Math.floor(seconds / interval.time);
    if (timePassed >= 1) {
      intervalType = interval.type + ". ago";

      break;
    }
  }

  if (!intervalType) {
    return "just now";
  }

  return `${timePassed} ${intervalType}`;
}
