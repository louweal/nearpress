import loremIpsum from "~/data/lorem-ipsum.json";

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

export function randomArticles(n) {
  let a = [];
  for (let i = 0; i < n; i++) {
    let title = getWords(Math.floor(Math.random() * 7) + 7);
    a.push({
      title: title,
      intro: getWords(14),
      slug: title.toLowerCase().replaceAll(" ", "-"),
      visual: Math.ceil(Math.random() * 13),
      date: {
        Y: Math.ceil(Math.random() * 3) + 2019,
        M: String(Math.ceil(Math.random() * 12)).padStart(2, "0"),
        D: String(Math.ceil(Math.random() * 30)).padStart(2, "0"), // quick but imperfect
        H: String(Math.floor(Math.random() * 23)).padStart(2, "0"),
        m: String(Math.floor(Math.random() * 60)).padStart(2, "0"),
      },
    });
  }

  return a;
}
