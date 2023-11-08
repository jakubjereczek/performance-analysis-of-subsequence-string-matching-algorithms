function toPercentage(number: number): string {
  const percentage = (number * 100).toFixed(2);
  return `${percentage}%`;
}

function bytesToMegabytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export { toPercentage, bytesToMegabytes };
