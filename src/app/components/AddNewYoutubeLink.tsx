import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import { PlayListContext } from "../contexts/playListContex";
import Button from "./Button";
import { getInfo } from "../../../Utils/youtubeDownloader";
import api from "@/services/api";

interface CreateUpdatLinkProps {
  id?: string;
  onConfirm?: () => void;
}

export function AddNewYoutubeLink({ id, onConfirm }: CreateUpdatLinkProps) {
  const { playList, getPlayListItem, addLink } = useContext(PlayListContext);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [songURL, setSongURL] = useState("");
  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  // Chamada da função de download e armazenamento do arquivo

  async function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() === "") {
      alert("Preencha o input para proseguir!");
      return;
    }
    setLoading(true);
    console.log(input.trim());

    const response = await api
      .get("/api/main", {
        params: {
          videoLink: input,
        },
      })
      .then(async (response) => {
        if (!response?.data?.data) {
          alert("Não foi possivel adicionar o video");
        }
        const data = response.data.data;
        console.log("id", data);
        setSongURL(data.audio);

        const id = await addLink({
          ...data,
        });
        if (!!id) {
          setLoading(false);
          onConfirm();
          alert("Video adiconado com sucesso");
        } else {
          alert("Não foi possivel adicionar o video");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("responser", error);
        alert("Erro: " + error);
      });
  }

  return (
    <div className="">
      <Input
        customClass={``}
        key={"linkInput"}
        handleChange={handleChange}
        value={input}
        labelText={"YoutubeLink"}
        labelFor={"YoutubeLink"}
        id={"YoutubeLink"}
        name={"YoutubeLink"}
        type={"input"}
        placeholder={"YoutubeLink"}
        // disabled={!isEnabled}
        // isHidden={isHedden(field.id)}
      />
      <div className="mt-3">
        {!!songURL && <audio src={songURL} controls></audio>}
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button disabled={loading} onClick={handleSubmit} variant="secundary">
          {loading ? "Adicioando..." : "adicionar"}
        </Button>
      </div>
    </div>
  );
}
