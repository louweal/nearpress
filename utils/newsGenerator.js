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
  let s = "";
  let chapter = 1;

  for (let i = 0; i < n; i++) {
    if (i === 0 || Math.ceil(Math.random() * 3) == 3) {
      let title =
        getWords(Math.ceil(Math.random() * 3)).replaceAll(".", "") + "\n";
      chapter += 1;
      s += title;
    }

    let content = getWords(30 + Math.floor(Math.random() * 55)) + "\n";
    s += content;
  }

  return s;
}

export function fakeNews(n) {
  let numCategories = categories.length;
  let categorySlugs = categories.map((c) => c.slug);
  let imagesUsed = new Array(numCategories).fill(0);
  let imagesPerCategory = categories.map((c) => c.images);

  let a = [];
  for (let i = 0; i < n; i++) {
    let title = getWords(Math.floor(Math.random() * 4) + 7).replaceAll(".", "");
    let slug = title.toLowerCase().replaceAll(" ", "-");
    let existingSlugSet = new Set(a.map((a) => a.slug));

    if (existingSlugSet.has(slug)) {
      n += 1;
      continue; // do not add post with duplicate title/slug
    }

    let author = Math.floor(Math.random() * 42); // the data/writers.json contains 42 writers, with ids 0-41
    title = title.charAt(0) + title.slice(1).toLowerCase();
    let content = makeParagraphs(7 + Math.ceil(Math.random() * 15)); // max 50 paragraphs
    let catId = author % numCategories;
    let category = categorySlugs[catId];

    a.push({
      id: a.length,
      title: title,
      slug: title.toLowerCase().replaceAll(" ", "-"),
      intro: getWords(10 + Math.ceil(Math.random() * 8)),
      visual: `${category}/${imagesUsed[catId] + 1}.jpg`,
      category: category,
      content: content,
      date:
        new Date(
          (1577840461 + Math.ceil(Math.random() * 94694400)) * 1000
        ).getTime() / 1000, // 1-1-2020 + 3 years -- the date timestamp is in SECONDS for solidity
      author: author,
      views: Math.ceil(Math.random() * 500),
      price:
        Math.ceil(Math.random() * 12) === 12
          ? 0
          : (3 + Math.ceil(Math.random() * 7)) * 50, // price in TRX
    });

    imagesUsed[catId] = (imagesUsed[catId] + 1) % imagesPerCategory[catId];
  }

  return a;
}
