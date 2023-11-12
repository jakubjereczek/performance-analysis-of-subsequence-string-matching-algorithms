export function rabinKarp(text: string, pattern: string): number[] {
  const result: number[] = [];
  const base = 256; 
  const prime = 101; 

  const patternLength = pattern.length;
  const textLength = text.length;

  let patternHash = 0;
  let windowHash = 0;
  let h = 1;

  for (let i = 0; i < patternLength - 1; i++) {
    h = (h * base) % prime;
  }

  for (let i = 0; i < patternLength; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    windowHash = (base * windowHash + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= textLength - patternLength; i++) {
    if (patternHash === windowHash) {
      let j = 0;
      while (j < patternLength && pattern[j] === text[i + j]) {
        j++;
      }
      if (j === patternLength) {
        result.push(i);
      }
    }

    if (i < textLength - patternLength) {
      windowHash =
        (base * (windowHash - text.charCodeAt(i) * h) + text.charCodeAt(i + patternLength)) %
        prime;
      if (windowHash < 0) {
        windowHash += prime;
      }
    }
  }

  return result;
}