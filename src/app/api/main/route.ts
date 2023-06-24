import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import {
  PlayListItemProps,
  ThumbnailProps,
} from "../../../../types/videoInfos";

export async function GET(req: NextRequest, res: NextResponse) {
  const videoLink = await req.nextUrl.searchParams.get("videoLink");
  fsPromise;
  // console.log("req.nextUrl.searchParams", req.nextUrl.searchParams);
  try {
    const isVideoIdValid = await ytdl.validateURL(videoLink);
    if (!isVideoIdValid) {
      return NextResponse.json(
        { error: req.nextUrl.searchParams },
        { status: 404 }
      );
    }
    const info = await ytdl.getInfo(videoLink);
    let format = await ytdl.chooseFormat(info.formats, { quality: "140" });

    const audioPath = "./public/audios"; //path.join(__dirname, "audio"); // Diretório onde será salvo o áudio
    if (!fs.existsSync(audioPath)) {
      fs.mkdirSync(audioPath); // Cria o diretório se não existir
    }

    const audioFilename = `${info.videoDetails.videoId}.mp3`; // Nome do arquivo de áudio
    const audioFilePath = path.join(audioPath, audioFilename); // Caminho completo do arquivo

    const writeStream = fs.createWriteStream(audioFilePath);
    const videoSize = parseInt(format.contentLength); // Tamanho do arquivo de áudio em bytes

    // Atualiza o progresso de download a cada 1MB (1024KB)
    const updateInterval = 1024 * 1024;
    let downloadedSize = 0;

    writeStream.on("data", (chunk) => {
      downloadedSize += chunk.length;
      console.log(`Downloading... chunk`);

      // Envia atualizações de progresso para o cliente a cada updateInterval bytes baixados
      if (downloadedSize % updateInterval === 0) {
        const progress = (downloadedSize / videoSize) * 100;
        // res.headers.set("progress", `${progress.toFixed(2)}%\n`);
        console.log("progress", progress);
      }
    });
    console.log(`Downloading... d`, audioFilePath, writeStream.writableLength);

    ytdl(videoLink, { format: format }).pipe(writeStream);

    let audio = audioFilePath?.split("public/")[1];

    const data = {
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      thumbnails: info.videoDetails.thumbnails as ThumbnailProps[],
      audio,
      video_url: info.videoDetails.video_url,
      author: info.videoDetails.author.name,
      lengthSeconds: parseInt(info.videoDetails.lengthSeconds),
      liked: false,
      starts: undefined,
      // path: audioFilePath, // Caminho do arquivo de áudio salvo
    } as PlayListItemProps; // Finaliza a resposta após o download ser concluído

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
