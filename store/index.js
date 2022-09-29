export const state = () => ({
  showModal: false,
  articles: [],
});

export const mutations = {
  toggleModal(state) {
    state.showModal = !state.showModal;
  },

  SET_ARTICLES(state, payload) {
    state.articles = payload;
  },
};
