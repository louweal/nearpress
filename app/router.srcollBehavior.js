export default function (to) {
  if (to.hash) {
    return window.scrollTo({
      top: document.querySelector(to.hash).offsetTop + window.innerHeight,
      behavior: "smooth",
    });
  }
  return window.scrollTo({ top: 0, behavior: "auto" }); // to disable smooth scrolling on route change!!
}
