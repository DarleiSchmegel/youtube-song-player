import React, { useContext, useState } from "react";
import { PlayListContext } from "../contexts/playListContex";
import { AudioRow } from "./AudioRow";
import { convertSecondsToMinutes } from "../../../Utils/TimeHandler";

export function AudioList() {
  const { playList } = useContext(PlayListContext);
  const [openModal, setModalOpen] = useState(false);
  const values = Object.values(playList)?.reverse();
  return (
    <div className=" fixed max-h-[calc(100vh_-_400px)] rounded-xl overflow-auto scroll-mr-2 m-2">
      <div className="dark flex justify-center">
        <div className=" t-[100px] w-player flex flex-col p-3 shadow-player-light bg-player-light-background border border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl">
          <div className="  dark:text-gray-200">
            {values &&
              values.map((value, index) => {
                return (
                  <AudioRow
                    key={value.data.videoId}
                    id={value.data.videoId}
                    author={value.data.author}
                    index={index + 1}
                    liked={true}
                    title={value.data.title}
                    timeDuration={convertSecondsToMinutes(
                      value.data.lengthSeconds
                    )}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
