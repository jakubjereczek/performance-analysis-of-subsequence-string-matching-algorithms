function buildBadCharacterTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  const patternLength = pattern.length;

  for (let i = 0; i < patternLength - 1; i++) {
    const char = pattern[i];
    table.set(char, patternLength - 1 - i);
  }

  return table;
}

function buildGoodSuffixTable(pattern: string): number[] {
  const patternLength = pattern.length;
  const goodSuffixTable: number[] = new Array(patternLength);
  const suffix = new Array(patternLength).fill(0);
  let lastPrefixPosition = patternLength;

  for (let i = patternLength - 1; i >= 0; i--) {
    if (i > lastPrefixPosition && suffix[i + patternLength - 1 - lastPrefixPosition] < i - lastPrefixPosition) {
      goodSuffixTable[i] = suffix[i + patternLength - 1 - lastPrefixPosition];
    } else {
      if (i < lastPrefixPosition) {
        lastPrefixPosition = i;
      }
      let j = i - 1;
      while (j >= 0 && pattern[j] === pattern[j + patternLength - 1 - i]) {
        j--;
      }
      goodSuffixTable[i] = i - j;
    }
  }

  for (let i = 0; i < patternLength - 1; i++) {
    suffix[i] = patternLength;
  }

  for (let i = patternLength - 1; i >= 0; i--) {
    if (goodSuffixTable[i] === i + 1) {
      for (let j = 0; j < patternLength - 1 - i; j++) {
        if (suffix[j] === patternLength) {
          suffix[j] = patternLength - 1 - i;
        }
      }
    }
  }

  for (let i = 0; i <= patternLength - 2; i++) {
    goodSuffixTable[patternLength - 1 - suffix[i]] = patternLength - 1 - i;
  }

  return goodSuffixTable;
}

export function searchBoyerMoore(text: string, pattern: string): number[] {
  const patternLength = pattern.length;
  const textLength = text.length;
  const badCharacterTable = buildBadCharacterTable(pattern);
  const goodSuffixTable = buildGoodSuffixTable(pattern);
  const results: number[] = [];

  let i = 0;
  while (i <= textLength - patternLength) {
    let j = patternLength - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }
    if (j < 0) {
      results.push(i);
      i += goodSuffixTable[0];
    } else {
      const badCharacterSkip = badCharacterTable.get(text[i + j]) || patternLength;
      const goodSuffixSkip = goodSuffixTable[j];
      i += Math.max(badCharacterSkip, goodSuffixSkip);
    }
  }

  return results;
}
