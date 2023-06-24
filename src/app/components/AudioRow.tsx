import { HeartIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { PlayListContext } from "../contexts/playListContex";

interface AudioRowProps {
  id: string;
  title: string;
  author: string;
  liked: boolean;
  index: number;
  timeDuration: string;
}

export function AudioRow({
  id,
  title,
  author,
  liked,
  index,
  timeDuration,
}: AudioRowProps) {
  const { currentSong, updateCurrentSong } = useContext(PlayListContext);
  return (
    <div
      role="button"
      className="grid grid-cols-3 w-full hover:bg-slate-700 rounded-xl px-5 py-2"
      onClick={() => updateCurrentSong(currentSong, id)}
    >
      <div className="flex items-center col-span-2 flex-row gap-6 ">
        <p>{index}</p>
        <div>
          <p>{title}</p>
          <p>{author}</p>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center gap-4">
        <p>{timeDuration}</p>
        <p className="bg-gre">
          <HeartIcon className="w-8" />
          {liked}
        </p>
      </div>
    </div>
  );
}
