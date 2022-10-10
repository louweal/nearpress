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
  let end = 0;
  for (let i = 0; i < n; i++) {
    let p = {
      count: 0,
    };

    if (i > 0 && Math.ceil(Math.random() * 3) == 3) {
      // add section title above paragraph (1/3 prob)
      p["title"] = getWords(Math.ceil(Math.random() * 3));
      // p["count"] += p.title.length;
      end += p.title.length;
      p["titleEnd"] = end;
      end;
    }
    p["content"] = getWords(30 + Math.floor(Math.random() * 55));
    // p["count"] += p.content.length; // character count
    end += p.content.length;
    p["end"] = end;
    a.push(p);
  }
  return { a, end };
}

export function news(n) {
  let numChannels = channels.length;

  let channelSlugs = channels.map((c) => c.slug);

  let a = [];
  for (let i = 0; i < n; i++) {
    let title = getWords(Math.floor(Math.random() * 4) + 7);
    let content = makeParagraphs(7 + Math.ceil(Math.random() * 5));
    let channel = channelSlugs[Math.floor(Math.random() * numChannels)];
    let numImages = channels.find((c) => c.slug === channel).images;

    let authors = [
      { name: "Molly Ogelbe" },
      { name: "Tedie Sivorn" },
      { name: "Darnall Fitchett" },
      { name: "Morgan New" },
      { name: "Amory Alexandre" },
      { name: "Cristabel Roof" },
      { name: "Estevan McKenny" },
      { name: "Verney Keilty" },
      { name: "Alden Trouncer" },
      { name: "Kori Bielefeld" },
      { name: "Bertina Geertz" },
      { name: "Farrand Pirri" },
      { name: "Doralin Frier" },
      { name: "Manolo Chimes" },
      { name: "Hulda Ortner" },
      { name: "Amalie Hollingdale" },
      { name: "Marlo Kender" },
      { name: "Edwina Keiley" },
      { name: "Ariella Hobell" },
      { name: "Bryon Rowling" },
      { name: "Berne Mimmack" },
      { name: "Verne Fantham" },
      { name: "Gerda Clotworthy" },
      { name: "Nanice O'Moylane" },
      { name: "Orland Middlemass" },
      { name: "Thalia Kinig" },
      { name: "Donovan Welldrake" },
      { name: "Gothart Burtt" },
      { name: "Ginni Tofano" },
      { name: "Becki Barcke" },
    ].map((a) => a.name);

    a.push({
      author: authors[Math.floor(Math.random() * authors.length)],
      id: i,
      title: title,
      intro: getWords(14),
      slug: title.toLowerCase().replaceAll(" ", "-"),
      visual: { name: Math.ceil(Math.random() * numImages), path: channel },
      channel: channel,
      content: content.a,
      total: content.end,
      date: new Date((1662031747 + Math.ceil(Math.random() * 2592000)) * 1000), // 1 sept 2022 + 1 month
      views: 0,
      viewers: 0,
    });
  }

  return a;
}
