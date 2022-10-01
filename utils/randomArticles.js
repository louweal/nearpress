import loremIpsum from "~/data/lorem-ipsum.json";
import channels from "~/data/channels.json";

function shuffledLorem() {
  return loremIpsum.text
    .split(". ")
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .join(". ");
}

function getWords(x) {
  return shuffledLorem().split(/[ ,]+/).slice(0, x).join(" ");
}

function makeParagraphs(n) {
  let a = [];
  for (let i = 0; i < n; i++) {
    let p = {};

    if (i > 0 && Math.ceil(Math.random() * 3) == 3) {
      // add section title above paragraph (1/3 prob)
      p["title"] = getWords(Math.ceil(Math.random() * 3));
    }
    p["content"] = getWords(30 + Math.floor(Math.random() * 55));
    p["count"] = p.content.length; // character count
    a.push(p);
  }
  return a;
}

export function randomArticles(n) {
  let numChannels = channels.length;

  let channelSlugs = channels.map((c) => c.slug);

  let a = [];
  for (let i = 0; i < n; i++) {
    let title = getWords(Math.floor(Math.random() * 4) + 7);
    let content = makeParagraphs(7 + Math.ceil(Math.random() * 5));
    let channel = channelSlugs[Math.floor(Math.random() * numChannels)];

    // console.log(channel);
    let numImages = channels.find((c) => c.slug === channel).images;
    // console.log("numImages :>> ", numImages);

    a.push({
      author: getWords(2)
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" "),
      id: i,
      title: title,
      intro: getWords(14),
      slug: title.toLowerCase().replaceAll(" ", "-"),
      visual: Math.ceil(Math.random() * numImages),
      channel: channel,
      content: content,
      count: content
        .map((p) => p.count)
        .reduce((partialSum, a) => partialSum + a, 0),
      date: new Date((1662031747 + Math.ceil(Math.random() * 2592000)) * 1000), // 1 sept 2022 + 1 month
    });
  }

  // date: {
  //   Y: Math.ceil(Math.random() * 3) + 2019,
  //   M: String(Math.ceil(Math.random() * 12)).padStart(2, "0"),
  //   D: String(Math.ceil(Math.random() * 30)).padStart(2, "0"), // quick but imperfect
  //   H: String(Math.floor(Math.random() * 23)).padStart(2, "0"),
  //   m: String(Math.floor(Math.random() * 60)).padStart(2, "0"),
  // },

  return a;
}
