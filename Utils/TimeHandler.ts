function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
function calculateElapsedTime(totalTimeInSeconds, percentageElapsed) {
  if (totalTimeInSeconds === 0) return 0;
  // Verifica se o tempo total é um número positivo
  if (typeof totalTimeInSeconds !== "number") {
    throw new Error(
      "Tempo total inválido. O tempo total deve ser um número positivo."
    );
  }

  // Verifica se a porcentagem decorrida está dentro do intervalo válido (0 a 100)
  if (percentageElapsed < 0 || percentageElapsed > 100) {
    throw new Error(
      "Porcentagem decorrida inválida. A porcentagem decorrida deve estar entre 0 e 100."
    );
  }

  // Calcula o tempo decorrido em segundos
  const elapsedSeconds = Math.floor(
    (percentageElapsed / 100) * totalTimeInSeconds
  );

  return convertSecondsToMinutes(elapsedSeconds);
}

export { convertSecondsToMinutes, calculateElapsedTime };
