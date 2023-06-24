import { NextRequest, NextResponse } from "next/server";

import ytdl from "ytdl-core";
import {
  PlayListItemProps,
  ThumbnailProps,
} from "../../../../types/videoInfos";

export async function GET(req: NextRequest, res) {
  const videoLink = req.nextUrl.searchParams.get("videoLink");

  try {
    const isVideoIdValid = await ytdl.validateURL(videoLink);
    if (!isVideoIdValid) {
      console.log("e", isVideoIdValid);
      return NextResponse.json({ error: "URL invalida" }, { status: 404 });
    }
    const info = await ytdl.getInfo(videoLink);
    // console.log("deta", info.videoDetails.lengthSeconds);
    let format = await ytdl.chooseFormat(info.formats, { quality: "140" });
    const data = {
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      thumbnails: info.videoDetails.thumbnails as ThumbnailProps[],
      audio: format.url,
      video_url: info.videoDetails.video_url,
      author: info.videoDetails.author.name,
      lengthSeconds: parseInt(info.videoDetails.lengthSeconds),
      liked: false,
      starts: undefined,
    } as PlayListItemProps;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    // console.log("Erro aso acessar video no metodo GET", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
