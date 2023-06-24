import { useEffect } from "react";

export function Event() {
  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3000/api/event",{
  //     withCredentials
  //   });
  //   console.log("even", eventSource);
  //   eventSource.onmessage = (event) => {
  //     console.log("eventtt", event);
  //     const progressData = JSON.parse(event.data);
  //     const progress = parseFloat(progressData);

  //     // Atualize a interface do usuário com a progressão do download
  //     console.log(`Progress: ${progress}%`);

  //     if (progress === 100) {
  //       // O download foi concluído
  //       eventSource.close();
  //     }
  //   };

  //   eventSource.onerror = () => {
  //     // Ocorreu um erro na conexão
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/api/event/";
    const videoLink = "https://youtu.be/c8f4tYQaHAY";
    console.log(videoLink, videoLink);
    // Construa a URL da API com os parâmetros necessários
    const url = new URL(apiUrl);

    url.searchParams.append("videoLink", videoLink);
    // console.log("url.toString()", url.toString());
    // return;
    fetch(url.toString())
      .then((res) => {
        console.log("res: ", res);
      })
      .then((res) => {
        console.log("resF: ", res);
      });
  }, []);
  return <div>Your Component</div>;
}
