export const state = () => ({
  showModal: false,
  articles: [],
  channels: [],
  clickedArticle: undefined,
  user: undefined,
});

export const mutations = {
  toggleModal(state, payload) {
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

  addArticle(state, payload) {
    state.articles.push(payload);
  },

  // id, progress
  setProgress(state, payload) {
    if (state.user) {
      // console.log(state.user.history.map((i) => i.id));
      if (state.user.history.map((i) => i.id).includes(payload.id)) {
        //update
        state.user.history.forEach(
          (i) =>
            (i.progress = i.id === payload.id ? payload.progress : i.progress)
        );
      } else {
        // add history item
        state.user.history.push({
          id: payload.id,
          progress: payload.progress,
        });
      }
    }
  },

  setUser(state, payload) {
    state.user = payload;
  },

  setSelectedChannels(state) {
    if (state.user) {
      state.channels.forEach(
        (c) => (c["selected"] = state.user.channels.includes(c.slug))
      );
    } else {
      return;
    }
  },

  updateViews(state, id) {
    state.articles.forEach(
      (a) => (a.views = a.id === id ? a.views + 1 : a.views)
    );
  },

  addUserChannel(state, payload) {
    state.user.channels.push(payload);
  },

  removeUserChannel(state, payload) {
    state.user.channels = state.user.channels.filter((c) => c !== payload);
  },

  setClickedArticle(state, payload) {
    state.clickedArticle = payload;
  },
};
