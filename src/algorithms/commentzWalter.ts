export class CommentzWalter {
  private _patterns: string[];
  private _trie: Map<string, number>;

  constructor(patterns: string[]) {
    this._patterns = patterns;
    this._trie = new Map();
    this.buildTrie();
  }

  private buildTrie() {
    for (const pattern of this._patterns) {
      const m = pattern.length;
      for (let i = 0; i < m; i++) {
        const suffix = pattern.substring(i);
        this._trie.set(suffix, i);
      }
    }
  }

  public search(text: string): number[] {
    const n = text.length;
    const results: { pattern: string; index: number }[] = [];

    for (const pattern of this._patterns) {
      let i = 0;
      while (i <= n - pattern.length) {
        const suffix = text.substring(i);
        if (this._trie.has(suffix)) {
          results.push({ pattern, index: i });
          i += pattern.length - this._trie.get(suffix)!;
        } else {
          i++;
        }
      }
    }

    return results.map((result) => result.index);
  }
}

/* 
const patterns = ["abc", "def", "ghi"];
const text = "abcdefghi";
const commentzWalter = new CommentzWalter(patterns);
const occurrences = commentzWalter.search(text);
*/
