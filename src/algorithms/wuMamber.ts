export class WuManber {
  private patterns: string[];
  private alphabetSize: number;
  private k: number;
  private masks: { [pattern: string]: number };
  private shifts: { [pattern: string]: number };

  constructor(patterns: string[], alphabetSize = 256, k = 3) {
    this.patterns = patterns;
    this.alphabetSize = alphabetSize;
    this.k = k;
    this.masks = {};
    this.shifts = {};
    this.createMasksAndShifts();
  }

  private createMasksAndShifts(): void {
    for (const pattern of this.patterns) {
      let mask = 0;
      for (const char of pattern) {
        mask |= 1 << char.charCodeAt(0) % this.alphabetSize;
      }
      const shift = 1 << (pattern.length - 1);
      this.masks[pattern] = mask;
      this.shifts[pattern] = shift;
    }
  }

  public search(text: string): { index: number; pattern: string }[] {
    const results: { index: number; pattern: string }[] = [];

    for (const pattern of this.patterns) {
      const mask = this.masks[pattern];
      const shift = this.shifts[pattern];
      let h = 0;

      for (let i = 0; i < text.length; i++) {
        h = ((h << 1) + text.charCodeAt(i)) & ((1 << this.k) - 1);
        if (i >= pattern.length - 1) {
          if ((h & mask) === 0) {
            results.push({ index: i - pattern.length + 1, pattern });
          }
        }
      }

      h = (h << 1) & ((1 << this.k) - 1);

      for (let i = text.length - pattern.length + 1; i < text.length; i++) {
        h = ((h << 1) + text.charCodeAt(i)) & ((1 << this.k) - 1);
        if ((h & mask) === 0) {
          results.push({ index: i - pattern.length + 1, pattern });
        }
      }
    }

    return results;
  }
}

/*
const patterns = ["apple", "banana", "cherry"];
const wm = new WuManber(patterns);
const text = "banana and cherry are fruits. I like apple pie.";

const results = wm.search(text);
*/
