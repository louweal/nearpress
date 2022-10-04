export const state = () => ({
  showModal: false,
  showDropdown: false,
  articles: [],
  channels: [],
  clickedArticle: undefined,
  user: undefined,
});

export const mutations = {
  toggleModal(state) {
    state.showModal = !state.showModal;
  },
  toggleDropdown(state) {
    state.showModal = !state.showModal;
  },

  SET_ARTICLES(state, payload) {
    state.articles = payload;
  },

  SET_CHANNELS(state, payload) {
    state.channels = payload;
  },

  // id, progress
  setProgress(state, payload) {
    state.articles.forEach(
      (a) =>
        (a["progress"] = a.id === payload.id ? payload.progress : a.progress)
    );
  },

  setUser(state, payload) {
    state.user = payload;
    console.log("state.user");
  },

  setSelectedChannels(state) {
    // console.log(state);
    if (state.user) {
      state.channels.forEach(
        (c) => (c["selected"] = state.user.channels.includes(c.slug))
      );
    } else {
      return;
    }
  },

  addUserChannel(state, payload) {},

  removeUserChannel(state, payload) {},

  setClickedArticle(state, payload) {
    state.clickedArticle = payload;
  },
};
