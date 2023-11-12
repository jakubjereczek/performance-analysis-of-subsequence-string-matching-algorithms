class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;
  public failure: TrieNode | null;
  public output: string[];

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.failure = null;
    this.output = [];
  }
}

export class AhoCorasick {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addPattern(keyword: string): void {
    let node = this.root;
    for (const char of keyword) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
    node.output.push(keyword);
  }

  buildSuffixAndOutputLinks(): void {
    const queue: TrieNode[] = [];

    for (const child of this.root.children.values()) {
      queue.push(child);
      child.failure = this.root;
    }

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      for (const [char, child] of currentNode.children) {
        queue.push(child);
        let failureNode: TrieNode | null = currentNode.failure;

        while (failureNode !== null && !failureNode.children.has(char)) {
          failureNode = failureNode.failure;
        }

        child.failure = failureNode
          ? failureNode.children.get(char)!
          : this.root;
        child.output = child.output.concat(child.failure.output);
      }
    }
  }

  search(text: string): string[] {
    let result: string[] = [];
    let currentNode: TrieNode | null = this.root;

    for (const char of text) {
      while (currentNode !== null && !currentNode.children.has(char)) {
        currentNode = currentNode.failure;
      }

      if (currentNode === null) {
        currentNode = this.root;
      } else {
        currentNode = currentNode.children.get(char)!;

        if (currentNode.isEndOfWord) {
          result = result.concat(currentNode.output);
        }
      }
    }

    return result;
  }
}

/*
const ahoCorasick = new AhoCorasick();
ahoCorasick.addPattern("he");
ahoCorasick.addPattern("she");
ahoCorasick.addPattern("his");
ahoCorasick.addPattern("hers");
ahoCorasick.buildSuffixAndOutputLinks();

const text = "ushershers";
const results = ahoCorasick.search(text);

*/
