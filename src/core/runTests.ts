import TextCache from "../textCache";
import patternMatchingSuite, { AlgorithmName } from "./patternMatchingSuite";
import testSuite from "./testSuite";

export async function runTests() {
  /* Loading pdf files and cache in memory. 
  All .pdf files are loaded from ./sources directory */

  const fullText = await TextCache.getText();

  /* Searching for a single word
   a) 5-character pattern
   b) 10-character pattern
   c) 15-character pattern
  */
  const testCase1BaseArgs = {
    patterns: ["akcje", "inwestycja", "przedsiębiorczy"],
    text: fullText,
  };
  const testCase1 = {
    [AlgorithmName.BruteForce]: patternMatchingSuite({
      ...testCase1BaseArgs,
      name: AlgorithmName.BruteForce,
    }),
    [AlgorithmName.RabinKarp]: patternMatchingSuite({
      ...testCase1BaseArgs,
      name: AlgorithmName.RabinKarp,
    }),
    // multi pattern
    [`${AlgorithmName.AhoCorasick}a`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[0]],
      name: AlgorithmName.AhoCorasick,
    }),
    [`${AlgorithmName.AhoCorasick}b`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[1]],
      name: AlgorithmName.AhoCorasick,
    }),
    [`${AlgorithmName.AhoCorasick}c`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[2]],
      name: AlgorithmName.AhoCorasick,
    }),
    [AlgorithmName.BoyerMoore]: patternMatchingSuite({
      ...testCase1BaseArgs,
      name: AlgorithmName.BoyerMoore,
    }),
    [AlgorithmName.KnuthMorrisPratt]: patternMatchingSuite({
      ...testCase1BaseArgs,
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    // multi pattern
    [`${AlgorithmName.CommentzWalter}a`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[0]],
      name: AlgorithmName.CommentzWalter,
    }),
    [`${AlgorithmName.CommentzWalter}b`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[1]],
      name: AlgorithmName.CommentzWalter,
    }),
    [`${AlgorithmName.CommentzWalter}c`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[2]],
      name: AlgorithmName.CommentzWalter,
    }),
    // multi pattern
    [`${AlgorithmName.WuMamber}a`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[0]],
      name: AlgorithmName.WuMamber,
    }),
    [`${AlgorithmName.WuMamber}b`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[1]],
      name: AlgorithmName.WuMamber,
    }),
    [`${AlgorithmName.WuMamber}c`]: patternMatchingSuite({
      ...testCase1BaseArgs,
      patterns: [testCase1BaseArgs.patterns[2]],
      name: AlgorithmName.WuMamber,
    }),
  } as const;

  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "search single word",
    callbacks: testCase1[AlgorithmName.BruteForce]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "search single word",
    callbacks: testCase1[AlgorithmName.RabinKarp]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.AhoCorasick}a`]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.AhoCorasick}b`]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.AhoCorasick}c`]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "search single word",
    callbacks: testCase1[AlgorithmName.BoyerMoore]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "search single word",
    callbacks: testCase1[AlgorithmName.KnuthMorrisPratt]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.CommentzWalter}a`]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.CommentzWalter}b`]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.CommentzWalter}c`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.WuMamber}a`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.WuMamber}b`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "search single word",
    callbacks: testCase1[`${AlgorithmName.WuMamber}c`]!,
  });

  /* Searching for multiple words (multipattern)
   In the case of single-pattern algorithms, each pattern will be invoked one by one,
   for multipattern, all at once.
   a) 3 words: 5-character pattern, 10-character pattern, 20-character pattern
   b) 3 words: each 5-character pattern
   c) 3 words: each 10-character pattern
*/
  const testCase2BaseArgs = {
    patterns: [
      ["akcja", "kapitalizm", "kapitalistyczny"],
      ["akcja", "rynek", "konto"],
      ["konsultant", "spekulacja", "inwestycja"],
    ],
    text: fullText,
  };
  const testCase2 = {
    [`${AlgorithmName.BruteForce}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.BruteForce,
    }),
    [`${AlgorithmName.BruteForce}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.BruteForce,
    }),
    [`${AlgorithmName.BruteForce}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.BruteForce,
    }),
    [`${AlgorithmName.RabinKarp}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.RabinKarp,
    }),
    [`${AlgorithmName.RabinKarp}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.RabinKarp,
    }),
    [`${AlgorithmName.RabinKarp}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.RabinKarp,
    }),
    [`${AlgorithmName.AhoCorasick}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.AhoCorasick,
    }),
    [`${AlgorithmName.AhoCorasick}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.AhoCorasick,
    }),
    [`${AlgorithmName.AhoCorasick}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.AhoCorasick,
    }),
    [`${AlgorithmName.BoyerMoore}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.BoyerMoore,
    }),
    [`${AlgorithmName.BoyerMoore}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.BoyerMoore,
    }),
    [`${AlgorithmName.BoyerMoore}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.BoyerMoore,
    }),
    [`${AlgorithmName.KnuthMorrisPratt}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [`${AlgorithmName.KnuthMorrisPratt}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [`${AlgorithmName.KnuthMorrisPratt}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [`${AlgorithmName.CommentzWalter}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.CommentzWalter,
    }),
    [`${AlgorithmName.CommentzWalter}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.CommentzWalter,
    }),
    [`${AlgorithmName.CommentzWalter}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.CommentzWalter,
    }),
    [`${AlgorithmName.WuMamber}a`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[0],
      name: AlgorithmName.WuMamber,
    }),
    [`${AlgorithmName.WuMamber}b`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[1],
      name: AlgorithmName.WuMamber,
    }),
    [`${AlgorithmName.WuMamber}c`]: patternMatchingSuite({
      ...testCase2BaseArgs,
      patterns: testCase2BaseArgs.patterns[2],
      name: AlgorithmName.WuMamber,
    }),
  } as const;

  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.BruteForce}a`]!,
  });
  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.BruteForce}b`]!,
  });
  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.BruteForce}c`]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.RabinKarp}a`]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.RabinKarp}b`]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.RabinKarp}c`]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.AhoCorasick}a`]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.AhoCorasick}b`]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.AhoCorasick}c`]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.BoyerMoore}a`]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.BoyerMoore}b`]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.BoyerMoore}c`]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.KnuthMorrisPratt}a`]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.KnuthMorrisPratt}b`]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.KnuthMorrisPratt}c`]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.CommentzWalter}a`]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.CommentzWalter}b`]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.CommentzWalter}c`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "5-10-15",
    callbacks: testCase2[`${AlgorithmName.WuMamber}a`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "5-5-5",
    callbacks: testCase2[`${AlgorithmName.WuMamber}b`]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "10-10-10",
    callbacks: testCase2[`${AlgorithmName.WuMamber}c`]!,
  });

  /* Searching for a short sentence
   a) sentence of length 50 characters
  */
  const testCase3BaseArgs = {
    patterns: ["Metawersum, poprzez innowacyjne technologie cyfrow"],
    text: fullText,
  };
  const testCase3 = {
    [AlgorithmName.BruteForce]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.BruteForce,
    }),
    [AlgorithmName.RabinKarp]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.RabinKarp,
    }),
    [AlgorithmName.AhoCorasick]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.AhoCorasick,
    }),
    [AlgorithmName.BoyerMoore]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.BoyerMoore,
    }),
    [AlgorithmName.KnuthMorrisPratt]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [AlgorithmName.CommentzWalter]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.CommentzWalter,
    }),
    [AlgorithmName.WuMamber]: patternMatchingSuite({
      ...testCase3BaseArgs,
      name: AlgorithmName.WuMamber,
    }),
  } as const;

  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.BruteForce]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.RabinKarp]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.AhoCorasick]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.BoyerMoore]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.KnuthMorrisPratt]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.CommentzWalter]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "50 word sentence",
    callbacks: testCase3[AlgorithmName.WuMamber]!,
  });

  /* Searching for a long sentence
   a) sentence of length 200 characters
*/
  const testCase4BaseArgs = {
    patterns: [
      "Cyfrowy świat ewoluuje. Dzisiejsze inteligentne środowiska, funkcjonujące na małą skalę w fabrykach, na statkach czy w zautomatyzowanych terminalach, w przyszłości przekształcą się w całe dzielnic",
    ],
    text: fullText,
  };
  const testCase4 = {
    [AlgorithmName.BruteForce]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.BruteForce,
    }),
    [AlgorithmName.RabinKarp]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.RabinKarp,
    }),
    [AlgorithmName.AhoCorasick]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.AhoCorasick,
    }),
    [AlgorithmName.BoyerMoore]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.BoyerMoore,
    }),
    [AlgorithmName.KnuthMorrisPratt]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [AlgorithmName.CommentzWalter]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.CommentzWalter,
    }),
    [AlgorithmName.WuMamber]: patternMatchingSuite({
      ...testCase4BaseArgs,
      name: AlgorithmName.WuMamber,
    }),
  } as const;

  await testSuite({
    name: AlgorithmName.BruteForce,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.BruteForce]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.RabinKarp]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.AhoCorasick]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.BoyerMoore]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.KnuthMorrisPratt]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.CommentzWalter]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname: "200 word sentence",
    callbacks: testCase4[AlgorithmName.WuMamber]!,
  });

  /* Searching for random words
    a) random word for each call from a list of 50 available words, ranging from 5 to 20 characters
  */
  const words = [
    "inwestycja",
    "programista",
    "rynek",
    "kryptowaluty",
    "strategia",
    "finanse",
    "aplikacja",
    "kapitał",
    "portfel",
    "dostawca",
    "algorytm",
    "analiza",
    "handel",
    "platforma",
    "innowacje",
    "przedsiębiorstwo",
    "informatyka",
    "dolar",
    "projekt",
    "platforma",
    "budżet",
    "fintech",
    "technologia",
    "ryzyko",
    "handlowiec",
    "kapitał",
    "konto",
    "startup",
    "efektywność",
    "programowanie",
    "współpraca",
    "strategia",
    "zysk",
    "bankowość",
    "inżynieria",
    "platforma",
    "społeczeństwo",
    "szyfrowanie",
    "ekonomia",
    "transakcja",
    "analizy",
    "kapitał",
    "inwestor",
    "wskaźnik",
    "platforma",
    "deweloper",
    "produkt",
    "informacja",
    "programista",
    "zarobki",
  ];
  const testCase5BaseArgs = {
    patterns: () => [words[Math.floor(Math.random() * words.length)]],
    text: fullText,
  };
  const testCase5 = {
    [AlgorithmName.BruteForce]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.BruteForce,
    }),
    [AlgorithmName.RabinKarp]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.RabinKarp,
    }),
    [AlgorithmName.AhoCorasick]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.AhoCorasick,
    }),
    [AlgorithmName.BoyerMoore]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.BoyerMoore,
    }),
    [AlgorithmName.KnuthMorrisPratt]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.KnuthMorrisPratt,
    }),
    [AlgorithmName.CommentzWalter]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.CommentzWalter,
    }),
    [AlgorithmName.WuMamber]: patternMatchingSuite({
      ...testCase5BaseArgs,
      name: AlgorithmName.WuMamber,
    }),
  } as const;

  await testSuite({
    name: AlgorithmName.BruteForce,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.BruteForce]!,
  });
  await testSuite({
    name: AlgorithmName.RabinKarp,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.RabinKarp]!,
  });
  await testSuite({
    name: AlgorithmName.AhoCorasick,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.AhoCorasick]!,
  });
  await testSuite({
    name: AlgorithmName.BoyerMoore,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.BoyerMoore]!,
  });
  await testSuite({
    name: AlgorithmName.KnuthMorrisPratt,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.KnuthMorrisPratt]!,
  });
  await testSuite({
    name: AlgorithmName.CommentzWalter,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.CommentzWalter]!,
  });
  await testSuite({
    name: AlgorithmName.WuMamber,
    testname:
      "a random word within 50 words, from 5 to 20 characters for each call",
    callbacks: testCase5[AlgorithmName.WuMamber]!,
  });
}
