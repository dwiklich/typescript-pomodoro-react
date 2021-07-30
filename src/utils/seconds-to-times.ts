export function secondsToTime(seconds: number): string {
  // const min = Number(seconds / 60).toFixed(0);
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${min}:${sec}s`;
}
