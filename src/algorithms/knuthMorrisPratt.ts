function buildKMPPrefixTable(pattern: string): number[] {
  const patternLength = pattern.length;
  const prefixTable: number[] = new Array(patternLength).fill(0);
  let length = 0;
  let i = 1;

  while (i < patternLength) {
    if (pattern[i] === pattern[length]) {
      length++;
      prefixTable[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = prefixTable[length - 1];
      } else {
        prefixTable[i] = 0;
        i++;
      }
    }
  }

  return prefixTable;
}

export function searchKMP(text: string, pattern: string): number[] {
  const patternLength = pattern.length;
  const textLength = text.length;
  const prefixTable = buildKMPPrefixTable(pattern);
  const results: number[] = [];
  let i = 0;
  let j = 0;

  while (i < textLength) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === patternLength) {
      results.push(i - j);
      j = prefixTable[j - 1];
    } else if (i < textLength && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = prefixTable[j - 1];
      } else {
        i++;
      }
    }
  }

  return results;
}