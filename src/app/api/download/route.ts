import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import progress from "progress-stream";
import {
  PlayListItemProps,
  ThumbnailProps,
} from "../../../../types/videoInfos";

export async function GET(req: NextRequest, res: NextResponse) {
  const videoLink = await req.nextUrl.searchParams.get("videoLink");

  try {
    const isVideoIdValid = await ytdl.validateURL(videoLink);
    if (!isVideoIdValid) {
      return NextResponse.json(
        { error: req.nextUrl.searchParams },
        { status: 404 }
      );
    }

    const info = await ytdl.getInfo(videoLink);
    const format = await ytdl.chooseFormat(info.formats, { quality: "140" });

    const audioPath = "./public/audios";
    if (!fs.existsSync(audioPath)) {
      fs.mkdirSync(audioPath);
    }

    const audioFilename = `${info.videoDetails.videoId}.mp3`;
    const audioFilePath = path.join(audioPath, audioFilename);

    const writeStream = fs.createWriteStream(audioFilePath);
    const videoSize = parseInt(format.contentLength);
    console.log("format.contentLength", format.contentLength);

    // Configuração do progress-stream para monitorar o progresso do download
    const progressStream = progress({
      length: videoSize,
      time: 1000, // Intervalo de atualização em milissegundos
    });

    // Atualiza o progresso de download a cada 1MB (1024KB)
    const updateInterval = 1024 * 1024;
    let downloadedSize = 0;

    progressStream.on("progress", (progressData) => {
      downloadedSize = progressData.transferred;
      // Envia atualizações de progresso para o cliente a cada updateInterval bytes baixados
      console.log("progress", progressData.transferred);
      if (downloadedSize % updateInterval === 0) {
        const progress = (downloadedSize / videoSize) * 100;
        return res.send(`Downloading... ${progress.toFixed(2)}%\n`);
      }
    });

    await ytdl(videoLink, { format: format })
      .pipe(progressStream)
      .pipe(writeStream);

    const data = {
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      thumbnails: info.videoDetails.thumbnails as ThumbnailProps[],
      audio: audioFilePath,
      video_url: info.videoDetails.video_url,
      author: info.videoDetails.author.name,
      lengthSeconds: parseInt(info.videoDetails.lengthSeconds),
      liked: false,
      starts: undefined,
    } as PlayListItemProps;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
