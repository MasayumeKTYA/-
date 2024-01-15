//毫秒转分钟
export function nowTimeFu(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds %= 60;
  minutes %= 60;

  const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  return formattedTime;
}
//秒转分钟
export function TimeFormatMinute(milliseconds: number) {
  let minutes = Math.floor(milliseconds / 60);
  let seconds = milliseconds - minutes * 60;

  const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  // const formattedTime = "";
  console.log(formattedTime);

  return formattedTime;
}
function padZero(value: number) {
  return String(value).padStart(2, "0");
}
export function format(seconds: number) {
  let min =
    Math.floor(seconds / 60) >= 10
      ? Math.floor(seconds / 60)
      : "0" + Math.floor(seconds / 60);
  seconds -= 60 * Number(min);
  let sec = seconds >= 10 ? seconds : "0" + seconds;
  return min + ":" + sec;
}
