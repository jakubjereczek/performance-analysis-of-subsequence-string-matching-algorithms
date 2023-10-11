import { PDFSource } from '../structures';

function mapSources(sources: PDFSource[]): string {
  return sources.map((obj) => obj.text).join(' ');
}

export default mapSources;
