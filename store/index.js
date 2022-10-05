export const state = () => ({
  showModal: false,
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
    if (state.user) {
      console.log(state.user.history.map((i) => i.id));
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

    // state.user.forEach(
    //   (a) =>
    //     (a["progress"] = a.id === payload.id ? payload.progress : a.progress)
    // );
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
