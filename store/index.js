export const state = () => ({
  showModal: false,
  showDropdown: false,
  articles: [],
  channels: [],
  user: {
    id: 1,
    name: "Anneloes",
    channels: ["dogs", "hiking", "chess"],
  },
  // user: null
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
};
