import loremIpsum from "~/data/lorem-ipsum.json";
import categories from "~/data/channels.json";

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
  let end = 0;
  for (let i = 0; i < n; i++) {
    let p = {};

    if (i > 0 && Math.ceil(Math.random() * 3) == 3) {
      // add section title above paragraph (1/3 prob)
      p["title"] = getWords(Math.ceil(Math.random() * 3));
      end += p.title.length;
      p["titleEnd"] = end;
    }
    p["content"] = getWords(30 + Math.floor(Math.random() * 55));
    end += p.content.length;
    p["end"] = end;
    a.push(p);
  }
  return { a, end };
}

export function news(n) {
  let numCategories = categories.length;

  let categorySlugs = categories.map((c) => c.slug);

  let a = [];
  for (let i = 0; i < n; i++) {
    let author = Math.ceil(Math.random() * 42);
    let title = getWords(Math.floor(Math.random() * 4) + 7).replace(".", "");
    title = title.charAt(0) + title.slice(1).toLowerCase();
    let content = makeParagraphs(7 + Math.ceil(Math.random() * 15));
    let category = categorySlugs[author % numCategories];
    let numImages = categories.find((c) => c.slug === category).images;

    a.push({
      author: author, // the data/writers.json contains 42 writers, with ids 1-42
      id: i,
      title: title,
      intro: getWords(14),
      slug: title.toLowerCase().replaceAll(" ", "-"),
      visual: { name: Math.ceil(Math.random() * numImages), path: category },
      category: category,
      content: content.a,
      total: content.end,
      date: new Date((1662031747 + Math.ceil(Math.random() * 2592000)) * 1000), // 1 sept 2022 + 1 month
      views: Math.ceil(Math.random() * 777),
    });
  }

  return a;
}
