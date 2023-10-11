function bruteForce(text: string, pattern: string): number[] {
  const textLength = text.length;
  const patternLength = pattern.length;
  const positions: number[] = [];

  for (let i = 0; i <= textLength - patternLength; i++) {
    let j = 0;

    while (j < patternLength && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === patternLength) {
      positions.push(i);
    }
  }

  return positions;
}

export default bruteForce;