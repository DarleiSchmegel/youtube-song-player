"use client";
import { Modal } from "./components/Modal";
import { CreateUpdatLink } from "./components/createUpdateLink";
import { PlayListContext } from "./contexts/playListContex";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioList } from "./components/AudioList";
import { AddNewYoutubeLink } from "./components/AddNewYoutubeLink";
import { useContext, useState } from "react";

export default function HomePage() {
  const { playList } = useContext(PlayListContext);
  const [openModal, setModalOpen] = useState(false);
  const [openAddLinkModal, setAddLinkModalOpen] = useState(false);
  const values = Object?.values(playList);

  return (
    <section className="dark flex min-h-screen flex-col w-full  ">
      <h1>Teste</h1>
      {/* <Event /> */}
      <div className="fixed right-10 bottom-10 z-[49]">
        <button
          className="  text-green-500 hover:text-green-400 hover:cursor-pointer"
          onClick={() => setAddLinkModalOpen(true)}
        >
          <PlusCircleIcon className="w-20  " />
        </button>
      </div>
      <Modal
        className="max-w-2xl p-10"
        open={openModal}
        onClose={() => setModalOpen(false)}
      >
        <CreateUpdatLink onConfirm={() => setModalOpen(false)} />
      </Modal>
      <Modal
        className="max-w-2xl p-10"
        open={openAddLinkModal}
        onClose={() => setAddLinkModalOpen(false)}
      >
        <AddNewYoutubeLink onConfirm={() => setAddLinkModalOpen(false)} />
      </Modal>

      <AudioPlayer />
      <div className="mt-[310px] flex justify-center p-5">
        <AudioList />
      </div>
    </section>
  );
}
