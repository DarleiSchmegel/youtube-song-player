import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import {
  PlayListItemProps,
  ThumbnailProps,
} from "../../../../types/videoInfos";
import { NextApiResponse } from "next";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const videoLink = "https://youtu.be/dX3k_QDnzHE";

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

    // Configuração do progresso
    let downloadedSize = 0;

    writeStream.on("data", (chunk) => {
      downloadedSize += chunk.length;
    });

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

    // Iniciar o envio dos dados de progresso para o cliente através de SSE
    // return ;
    res.setHeader("Content-Type", "text/event-stream");
    // res.headers.set("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    console.log("res.headers.set", res);
    res.send(": connection established\n\n");

    const updateInterval = 1024 * 1024;
    let lastSentProgress = 0;

    const updateProgress = () => {
      const progress = (downloadedSize / videoSize) * 100;
      const progressDiff = progress - lastSentProgress;

      if (progressDiff >= 1) {
        res.send(`data: ${progress.toFixed(2)}%\n\n`);
        lastSentProgress = progress;
      }

      if (downloadedSize < videoSize) {
        setTimeout(updateProgress, updateInterval);
      } else {
        res.send(`data: 100%\n\n`);
        res.send(`event: complete\ndata: ${JSON.stringify(data)}\n\n`);
        res.end();
      }
    };

    updateProgress();
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
