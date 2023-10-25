function measurePerformance(func: () => void): number {
  const startTime = process.hrtime();
  func();
  const endTime = process.hrtime(startTime);

  const executionTimeMs = endTime[0] * 1e3 + endTime[1] / 1e6;

  return executionTimeMs;
}

export default measurePerformance;
