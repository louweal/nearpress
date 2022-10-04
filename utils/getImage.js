export default function getImage(path, name) {
  // let img = "none";
  try {
    return `url(${require("@/images/" + path + "/" + name + ".webp")})`;
  } catch {
    try {
      return `url(${require("@/images/" + path + "/" + name + ".jpg")})`;
    } catch {
      return "none";
    }
  }
}
