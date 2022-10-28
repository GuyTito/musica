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