import getSources from "./utils/getSources";
import mapSources from "./utils/mapSources";
import pdfToText from "./utils/pdfToText";

class TextCache {
  private static fullText: string | undefined;

  private static async loadText() {
    const sources = await getSources();
    const textPromises = sources.map(async (source) => await pdfToText(source));
    const texts = await Promise.all(textPromises);
    const fullText = mapSources(texts);

    return fullText;
  }

  public static async getText() {
    if (!this.fullText) {
      this.fullText = await this.loadText();
    }
    return this.fullText;
  }
}

export default TextCache;
