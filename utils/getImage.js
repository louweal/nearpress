export default function getImage(visual) {
  try {
    return `url(${require("@/images/" +
      visual.path +
      "/" +
      visual.name +
      ".webp")})`;
  } catch {
    try {
      return `url(${require("@/images/" +
        visual.path +
        "/" +
        visual.name +
        ".jpg")})`;
    } catch {
      return "none";
    }
  }
}
