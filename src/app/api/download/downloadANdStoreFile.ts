import fs from "fs";
import fetch from "node-fetch";

async function downloadAndStoreFile(url, filePath) {
  const response = await fetch(url);
  const fileStream = fs.createWriteStream(filePath);
  console.log("entrou");

  return new Promise<void>((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", () => {
      resolve();
    });
  });
}
export { downloadAndStoreFile };
