import loremIpsum from "~/data/lorem-ipsum.json";
import categories from "~/data/channels.json";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"; // "web3.storage" // = bug fix!

let token = process.env.IPFS_API_TOKEN;
const storage = new Web3Storage({ token });
const files = [];

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

  for (let i = 0; i < n; i++) {
    if (i !== 0 && Math.ceil(Math.random() * 3) == 3) {
      let title =
        getWords(Math.ceil(Math.random() * 4)).replaceAll(".", "") + "\n";
      s += title;
    }

    let content = getWords(55 + Math.floor(Math.random() * 70)) + "\n";
    s += content;
  }

  return s;
}

export async function fakeNews(n) {
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
    let content = makeParagraphs(8 + Math.ceil(Math.random() * 14));
    let catId = author % numCategories;
    let category = categorySlugs[catId];

    let post = {
      id: a.length,
      title: title,
      slug: title.toLowerCase().replaceAll(" ", "-"),
      intro: getWords(30 + Math.ceil(Math.random() * 14)),
      visual: `${category}/${imagesUsed[catId] + 1}.jpg`,
      category: category,
      content: content,
      date:
        new Date(
          (1577840461 + Math.ceil(Math.random() * 94694400)) * 1000
        ).getTime() / 1000, // 1-1-2020 + 3 years -- the date timestamp is in SECONDS
      author: author,
      views: Math.ceil(300 + Math.random() * 700),
      price: Math.round(Math.random() * 10) / 10, // price in NEAR
    };

    // upload post to IPFS
    let file = new File([JSON.stringify(post)], "post.json");

    files.push(file);
    const cid = await storage.put(files);
    // console.log("Content added with CID:", cid);

    post["cid"] = cid;

    // add post post array
    a.push(post);

    imagesUsed[catId] = (imagesUsed[catId] + 1) % imagesPerCategory[catId];
  }

  return a;
}
