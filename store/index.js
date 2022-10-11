export const state = () => ({
  showModal: false,
  posts: [],
  categories: [],
  writers: [],
  clickedPost: undefined,
  user: undefined,
});

export const mutations = {
  toggleModal(state) {
    state.showModal = !state.showModal;
  },

  SET_POSTS(state, payload) {
    state.posts = payload;
  },

  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_WRITERS(state, payload) {
    state.writers = payload;
  },

  addPost(state, payload) {
    state.posts.push(payload);
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

  updateViews(state, id) {
    state.posts.forEach((a) => (a.views = a.id === id ? a.views + 1 : a.views));
  },

  addUserCategory(state, payload) {
    state.user.categories.push(payload);
  },

  removeUserCategory(state, payload) {
    state.user.categories = state.user.categories.filter((c) => c !== payload);
  },

  addWriter(state, payload) {
    state.user.writers.push(payload);
  },

  removeWriter(state, payload) {
    state.user.writers = state.user.writers.filter((c) => c !== payload);
  },

  setClickedPost(state, payload) {
    state.clickedPost = payload;
  },
};
