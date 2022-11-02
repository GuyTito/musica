// The maximum is inclusive and the minimum is inclusive
export function getRandomNum(max: number) {
  let min = 0
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

// convert seconds to hh:mm:ss
export function hh_mm_ss(totalSeconds: number) {
  return new Date(totalSeconds * 1000).toISOString().substring(14, 19)
}

// Add two string time values (HH:mm:ss) with javascript
export function addTimes(startTime: string, endTime: string) {
  var a = startTime.split(":");
  var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  var b = endTime.split(":");
  var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);

  var date = new Date(1970, 0, 1);
  date.setSeconds(seconds + seconds2);

  var c = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

  return c
}

// convert hh:mm:ss to seconds
export function convertToSeconds(str: string){
  const [hours, minutes, seconds] = str.split(':');
  return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
}