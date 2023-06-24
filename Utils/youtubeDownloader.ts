const youtubedl = require("youtube-dl-exec");

async function getInfo(link: string) {
  youtubedl("https://www.youtube.com/watch?v=6xKWiCMKKJg", {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  }).then((output) => console.log(output));
}

export { getInfo };
