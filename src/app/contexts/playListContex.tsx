"use client";
import React, { useContext, useEffect, useState } from "react";
import { PlayListItemProps } from "../../../types/videoInfos";

export interface StoragePlayListProps {
  [id: string]: {
    data: PlayListItemProps;
  };
}
interface CurrentSongProps {
  audio: PlayListItemProps;
  isPlaying: boolean;
  progressTime: number;
}

interface PlayListContextData {
  playList: StoragePlayListProps;
  addLink: (props: PlayListItemProps) => Promise<string>;
  updateLink: (videoId: string, updatedLink: PlayListItemProps) => void;
  removeLink: (videoId: string) => void;
  fetchLinks: () => void;
  getPlayListItem: (id: string) => PlayListItemProps | undefined;
  skipToNext: () => void;
  skipToBack: () => void;
  updateCurrentSong: (
    currentSong: CurrentSongProps | undefined,
    id?: string
  ) => void;
  currentSong?: CurrentSongProps;
}

export const PlayListContext = React.createContext({} as PlayListContextData);

export const PlayListProvider = ({ children }: any) => {
  const [playList, setPlayList] = useState<StoragePlayListProps>({});
  const [currentSong, setCurrentSong] = useState<CurrentSongProps>(undefined);
  async function fetchLinks() {
    try {
      const data = await localStorage.getItem("PLAY_LIST");
      if (data) {
        setPlayList(JSON.parse(data));
      }
    } catch (error) {
      alert("Erro ao carregar Links: " + error);
    }
  }

  async function addLink({
    videoId,
    title,
    description,
    audio,
    thumbnails,
    video_url,
    liked,
    starts,
    lengthSeconds,
    author,
  }: PlayListItemProps) {
    try {
      const data = await localStorage.getItem("PLAY_LIST");
      const oldPlayList = data
        ? (JSON.parse(data) as StoragePlayListProps)
        : {};

      const newItemOnList = {
        [videoId]: {
          data: {
            videoId,
            title,
            author,
            description,
            audio,
            lengthSeconds,
            thumbnails,
            video_url,
            liked,
            starts,
          },
        },
      };
      const updatedList = { ...oldPlayList, ...newItemOnList };

      // return;

      await localStorage.setItem("PLAY_LIST", JSON.stringify(updatedList));
      setPlayList(updatedList);

      return videoId;
    } catch (error) {
      alert("Erro ao adicionar Link: " + error);
    }
  }

  function removeLink(videoId: string) {
    try {
      const updatedPlayList = { ...playList };
      delete updatedPlayList[videoId];

      localStorage.setItem("PLAY_LIST", JSON.stringify(updatedPlayList));
      setPlayList(updatedPlayList);
    } catch (error) {
      alert("Erro ao remover Link: " + error);
    }
  }
  function updateLink(videoId: string, updatedLink: PlayListItemProps) {
    try {
      const updatedPlayList = { ...playList };
      updatedPlayList[videoId].data = updatedLink;

      localStorage.setItem("PLAY_LIST", JSON.stringify(updatedPlayList));
      setPlayList(updatedPlayList);
    } catch (error) {
      alert("Erro ao atualizar Link: " + error);
    }
  }

  function getPlayListItem(id: string): PlayListItemProps | undefined {
    return playList[id]?.data || undefined;
  }

  function updateCurrentSong(
    currentSong: CurrentSongProps | undefined,
    id?: string
  ) {
    if (!!id) {
      const updateItem = getPlayListItem(id);
      if (!!updateItem) {
        const current = {
          audio: updateItem,
          progressTime: 0,
          isPlaying: currentSong?.isPlaying ? currentSong.isPlaying : false,
        } as CurrentSongProps;

        setCurrentSong(current);
      }
    } else {
      setCurrentSong(currentSong);
    }
  }
  const skipToNext = () => {
    const keys = Object.keys(playList)?.reverse();
    console.log("k", keys);

    // Encontrar o índice da chave atual
    const currentIndex = keys.indexOf(currentSong.audio.videoId);
    // Obter a próxima chave
    const nextIndex = currentIndex + 1;

    const nextKey = keys[nextIndex];

    if (!!nextKey) {
      setCurrentSong({
        audio: playList[nextKey].data,
        isPlaying: currentSong.isPlaying,
        progressTime: 0,
      });
    } else {
      console.log("Não há próximo elemento.");
    }
  };

  const skipToBack = () => {
    const keys = Object.keys(playList)?.reverse();

    // Encontrar o índice da chave atual
    const currentIndex = keys.indexOf(currentSong.audio.videoId);

    // Obter a próxima chave
    const backIndex = currentIndex - 1;
    const backKey = keys[backIndex];

    if (backKey) {
      setCurrentSong({
        audio: playList[backKey].data,
        isPlaying: currentSong.isPlaying,
        progressTime: 0,
      });
    } else {
      console.log("Não há próximo elemento.");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (!!playList) {
      const keys = Object.keys(playList)?.reverse();
      updateCurrentSong(undefined, keys[0]);
    }
  }, [playList]);
  return (
    <PlayListContext.Provider
      value={{
        playList,
        updateCurrentSong,
        currentSong,
        getPlayListItem,
        fetchLinks,
        addLink,
        skipToBack,
        skipToNext,
        removeLink,
        updateLink,
      }}
    >
      {children}
    </PlayListContext.Provider>
  );
};
