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

// convert hh:mm:ss to seconds
export function convertToSeconds(str: string){
  // const [hours, minutes, seconds] = str.split(':');
  // return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);

  const timeArray = str.split(':');
  if (timeArray.length == 2) {
    return Number(timeArray[0]) * 60 + Number(timeArray[1]);
  } else {
    return Number(timeArray[0]) * 60 * 60 + Number(timeArray[1]) * 60 + Number(timeArray[2]);
  }
}