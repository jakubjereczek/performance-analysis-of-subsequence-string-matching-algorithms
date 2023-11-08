import fs from "fs";
import path from "path";
import { toIdDateString } from "../utils/date";

class FileStream {
  private writeStream: fs.WriteStream | undefined;

  constructor(private filename: string) {}

  create() {
    if (this.writeStream) {
      console.error("You have already created writeStream.");
    }
    const directory = path.resolve(__dirname, "../../output");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    this.writeStream = fs.createWriteStream(
      path.resolve(
        __dirname,
        `../../output/${toIdDateString()} ${this.filename}`,
      ),
      {
        flags: "a",
      },
    );
  }

  write(payload: string) {
    this.writeStream?.write(payload + "\n");
  }

  close() {
    this.writeStream?.close();
  }
}

export default FileStream;
