import {
  AhoCorasick,
  CommentzWalter,
  WuManber,
  bruteForce,
  rabinKarp,
  searchBoyerMoore,
  searchKMP,
} from "../algorithms";

export enum AlgorithmName {
  BruteForce = "Brute Force Algorithm",
  RabinKarp = "Rabin Karp Algorithm",
  AhoCorasick = "Aho Corasick Algorithm",
  BoyerMoore = "Boyer Moore Algorithm",
  KnuthMorrisPratt = "Knuth Morris Pratt Algorithm",
  CommentzWalter = "Commentz Walter Algorithm",
  WuMamber = "Wu Mamber Algorithm",
}

export type PatternMatchingSuiteCallbacks = (() =>
  | number[]
  | string[]
  | { index: number; pattern: string }[])[];

interface PatternMatchingSuiteArgs {
  name: AlgorithmName;
  patterns: string[] | (() => string[]);
  text: string;
}

function patternMatchingSuite({
  name,
  patterns,
  text,
}: PatternMatchingSuiteArgs): PatternMatchingSuiteCallbacks | undefined {
  switch (name) {
    case AlgorithmName.BruteForce:
      return (typeof patterns === "function" ? patterns() : patterns).map(
        (pattern) => () => bruteForce(text, pattern),
      );
    case AlgorithmName.RabinKarp:
      return (typeof patterns === "function" ? patterns() : patterns).map(
        (pattern) => () => rabinKarp(text, pattern),
      );
    case AlgorithmName.AhoCorasick:
      return [
        () => {
          const ahoCorasick = new AhoCorasick();
          (typeof patterns === "function" ? patterns() : patterns).forEach(
            (pattern) => {
              ahoCorasick.addPattern(pattern);
            },
          );
          ahoCorasick.buildSuffixAndOutputLinks();
          return ahoCorasick.search(text);
        },
      ];
    case AlgorithmName.BoyerMoore:
      return (typeof patterns === "function" ? patterns() : patterns).map(
        (pattern) => () => searchBoyerMoore(text, pattern),
      );
    case AlgorithmName.KnuthMorrisPratt:
      return (typeof patterns === "function" ? patterns() : patterns).map(
        (pattern) => () => searchKMP(text, pattern),
      );
    case AlgorithmName.CommentzWalter:
      return [
        () => {
          const commentzWalter = new CommentzWalter(
            typeof patterns === "function" ? patterns() : patterns,
          );
          return commentzWalter.search(text);
        },
      ];
    case AlgorithmName.WuMamber:
      return [
        () => {
          const wuManber = new WuManber(
            typeof patterns === "function" ? patterns() : patterns,
          );
          return wuManber.search(text);
        },
      ];
    default:
      return [];
  }
}

export default patternMatchingSuite;
