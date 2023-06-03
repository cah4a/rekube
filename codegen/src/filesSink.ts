// import fs from 'fs/promises';
// import {resolve, dirname} from 'path';
// import {format} from 'prettier';

export class FilesSink {
  private files = new Map<string, string>();

  prepend(fileName: string, content: string) {
    const file = this.files.get(fileName);
    this.files.set(fileName, file ? `${content}\n\n${file}` : content);
  }

  append(fileName: string, content: string) {
    const file = this.files.get(fileName);
    this.files.set(fileName, file ? `${file}\n\n${content}` : content);
  }

  [Symbol.iterator]() {
    return this.files.entries();
  }
}
