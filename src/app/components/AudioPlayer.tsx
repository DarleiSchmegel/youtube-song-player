import {
  HeartIcon,
  PauseIcon,
  PencilIcon,
  PencilSquareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ShuffleIcon } from "./Icons/ShuffleIcon";
import { PrevIcon } from "./Icons/PrevIcon";
import { NextIcon } from "./Icons/NextIcon";
import { PlayIcon } from "./Icons/PlayIcon";
import { RepeatIcon } from "./Icons/RepeatIcon";
import { PlayListContext } from "../contexts/playListContex";
import {
  calculateElapsedTime,
  convertSecondsToMinutes,
} from "../../../Utils/TimeHandler";
import ReactAudioPlayer from "react-audio-player";

export function AudioPlayer() {
  const { currentSong, updateCurrentSong, skipToBack, skipToNext } =
    useContext(PlayListContext);
  const [canPlay, setCanPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [urlAudio, setUrlAudio] = useState(currentSong?.audio?.audio);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioElem = useRef();

  const canPlaying = audioElem?.current?.canPlayType(urlAudio);

  const clickRef = useRef();

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;

    audioElem.current.currentTime =
      (divprogress / 100) * currentSong.audio.lengthSeconds;
  };

  const onPlaying = () => {
    if (!audioElem) return;
    const duration = audioElem.current?.duration;
    const ct = audioElem.current.currentTime;

    const time = (ct / duration) * 100;

    updateCurrentSong({
      ...currentSong,
      isPlaying,

      progressTime: time || 0,
    });
    if (currentSong.progressTime === 100) skipToNext();
  };

  useEffect(() => {
    const canPlaying = audioElem?.current?.canPlayType(urlAudio);

    if (!audioElem && !canPlaying) return;
    if (isPlaying) {
      audioElem?.current?.play();
    } else {
      audioElem?.current?.pause();
    }
  }, [isPlaying, urlAudio]);
  useEffect(() => {
    console.log("[audioElem?.current", audioElem?.current?.src, isPlaying);
    if (isPlaying) audioElem?.current.play();
  }, [audioElem?.current?.src]);

  useEffect(() => {
    const canPlaying = audioElem?.current?.canPlayType(urlAudio);
    console.log("audioElem?.current?.can", canPlaying);
    setUrlAudio(currentSong?.audio?.audio);
    console.log("entrou", currentSong?.audio?.audio, urlAudio);
  }, [currentSong?.audio?.audio]);

  console.log("volume", audioElem?.current?.volume);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };
  useEffect(() => {
    if (!!audioElem?.current?.volume || audioElem?.current?.volume === 0)
      audioElem.current.volume = volume;
  }, [volume]);

  return (
    <div className="dark fixed  m-auto w-full z-40  p-8 flex justify-center">
      <div className="  w-player flex flex-col rounded-xl shadow-player-light bg-player-light-background border border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl">
        <div className="px-10 pt-10 pb-4 flex items-center z-50">
          <img
            data-amplitude-song-info="cover_art_url"
            className="w-24 h-24 rounded-md mr-6 border border-bg-player-light-background dark:border-cover-dark-border"
            src={currentSong?.audio?.thumbnails[0].url || ""}
          />

          {!!audioElem && canPlaying !== false && (
            <audio
              src={urlAudio}
              // src={"audios/dX3k_QDnzHE.mp3"}
              ref={audioElem}
              onEnded={() => skipToNext()}
              onTimeUpdate={onPlaying}
            />
          )}

          <div className="flex flex-col">
            <span
              data-amplitude-song-info="name"
              className="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white"
            >
              {currentSong?.audio?.title}
            </span>
            <span
              data-amplitude-song-info="artist"
              className="font-sans text-base font-medium leading-6 text-gray-500 dark:text-gray-400"
            >
              {currentSong?.audio?.author}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col px-10 pb-6 z-50">
          <div
            className="navigation_wrapper relative mb-2"
            onClick={checkWidth}
            ref={clickRef}
          >
            <div
              className={`seek_bar  flex items-center`}
              style={{ width: `${currentSong?.progressTime + "%"}` }}
            >
              <div
                className={`circul w-6 h-6 bg-white rounded-xl absolute`}
                style={{
                  marginLeft: `${currentSong?.progressTime}% `,
                }}
              ></div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <span className="amplitude-current-time text-xs font-sans tracking-wide font-medium text-sky-500 dark:text-sky-300">
              {/* {convertSecondsToMinutes(parseInt(currentSong.progressTime))} */}
              {calculateElapsedTime(
                currentSong?.audio?.lengthSeconds || 0,
                currentSong?.progressTime
              )}
            </span>
            <span className="amplitude-duration-time text-xs font-sans tracking-wide font-medium text-gray-500">
              {convertSecondsToMinutes(currentSong?.audio?.lengthSeconds)}
            </span>
          </div>
        </div>
        <div className="h-control-panel bg- px-10 rounded-b-xl bg-control-panel-light-background border-t border-gray-200 flex items-center justify-between z-50 dark:bg-control-panel-dark-background dark:border-gray-900">
          <div className={`cursor-pointer`} id="song-saved">
            <HeartIcon className={`text-slate-400 w-8`} />
          </div>
          <div className="cursor-pointer shuffle">
            <ShuffleIcon className="w-8 text-slate-400 cursor-pointer" />
          </div>

          <div
            className="cursor-pointer amplitude-prev"
            onClick={() => skipToBack()}
          >
            <PrevIcon className="w-8 text-slate-400 cursor-pointer" />
          </div>
          <div
            onClick={() => {
              !isPlaying ? setIsPlaying(true) : setIsPlaying(false);
            }}
            className="cursor-pointer amplitude-play-pause w-24 h-24 rounded-full bg-white border border-play-pause-light-border shadow-xl flex items-center justify-center dark:bg-play-pause-dark-background dark:border-play-pause-dark-border"
          >
            {!isPlaying ? (
              <PlayIcon className="w-9  text-slate-400 cursor-pointer" />
            ) : (
              <PauseIcon className="w-10 text-slate-400 cursor-pointer" />
            )}
          </div>
          <div
            className="cursor-pointer amplitude-next"
            onClick={() => skipToNext()}
          >
            <NextIcon className="w-8 text-slate-400 cursor-pointer" />
          </div>
          <div className="cursor-pointer amplitude-repeat-song">
            <RepeatIcon className="w-7 text-slate-400 cursor-pointer" />
          </div>

          <div className=" amplitude-repeat-song flex flex-row items-center gap-2">
            {volume === 0 ? (
              <SpeakerXMarkIcon className="w-5 text-slate-400" />
            ) : (
              <SpeakerWaveIcon className="w-5 text-slate-400" />
            )}

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              // className="volume"
              id="volume"
              onChange={handleVolumeChange}
            />
          </div>
        </div>
        <div className="hidden top-14 w-full absolute ml-auto mr-auto left-0 right-0 text-center max-w-lg h-72 rounded-full bg-highlight blur-2xl dark:block"></div>
      </div>
    </div>
  );
}
