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
    let title = getWords(4);
    a.push({
      title: title,
      intro: getWords(14),
      slug: title.toLowerCase().replaceAll(" ", "-"),
      visual: Math.ceil(Math.random() * n),
    });
  }

  return a;
}
