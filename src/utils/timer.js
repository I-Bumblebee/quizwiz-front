export function startTimer(maxTime, updateTime) {
  let timeLeft = maxTime * 60;
  const intervalId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTime(timeLeft);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
