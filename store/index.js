export const state = () => ({
  showModal: false,
  showOverlay: false, // overlay to avoid clicking when payment is required
  posts: [],
  categories: [],
  writers: [],
  user: undefined,
});

export const mutations = {
  toggleModal(state) {
    state.showModal = !state.showModal;
  },
  toggleOverlay(state) {
    state.showOverlay = !state.showOverlay;
  },

  SET_POSTS(state, payload) {
    state.posts = payload;
  },

  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_WRITERS(state, payload) {
    state.writers = payload; //
  },

  addPost(state, payload) {
    let post = {
      slug: payload.title.toLowerCase().replaceAll(" ", "-"),
      ...payload,
    };
    state.posts.push(post);

    localStorage.setItem(
      "browserPosts",
      JSON.stringify(state.posts.filter((p) => p.id >= 144))
    );
  },

  removePost(state, payload) {
    state.posts = state.posts.filter((p) => p.id !== payload);

    localStorage.setItem(
      "browserPosts",
      JSON.stringify(state.posts.filter((p) => p.id >= 144))
    );
  },

  // id, progress
  setProgress(state, payload) {
    if (state.user) {
      if (state.user.history.map((i) => i.id).includes(payload.id)) {
        state.user.history.forEach((i) => {
          i.progress = i.id === payload.id ? payload.progress : i.progress;
        });
      } else {
        state.user.history.push(payload);
      }
      updateLocalStorageUser(state.user);
    }
  },

  setUser(state, payload) {
    state.user = payload;
    if (payload) {
      updateLocalStorageUser(state.user);
    }
  },

  addWriter(state, payload) {
    if (state.writers.find((w) => w.id === payload.id) === undefined) {
      state.writers.push(payload);

      // update browser storage
      localStorage.setItem(
        "browserWriters",
        JSON.stringify(state.writers.slice(42))
      );
    }
  },

  setUserName(state, payload) {
    state.user.name = payload;
    state.user.slug = payload
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replaceAll(" ", "-");

    // also update username in localstorage
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach((w) => {
      w.name = w.id === state.user.id ? state.user.name : w.name;
      w.slug = w.id === state.user.id ? state.user.slug : w.slug;
    });
    localStorage.setItem("users", JSON.stringify(users));

    state.writers.forEach((w) => {
      w.name = w.id === state.user.id ? state.user.name : w.name;
      w.slug = w.id === state.user.id ? state.user.slug : w.slug;
    });

    // update browser storage
    localStorage.setItem(
      "browserWriters",
      JSON.stringify(state.writers.slice(42))
    );
  },

  updateViews(state, id) {
    state.posts.forEach((a) => (a.views = a.id === id ? a.views + 1 : a.views));
  },

  addUserCategory(state, payload) {
    state.user.categories.push(payload);
    updateLocalStorageUser(state.user);
  },

  removeUserCategory(state, payload) {
    state.user.categories = state.user.categories.filter((c) => c !== payload);
    updateLocalStorageUser(state.user);
  },

  addUserWriter(state, payload) {
    state.user.writers.push(payload);
    updateLocalStorageUser(state.user);
  },

  removeUserWriter(state, payload) {
    state.user.writers = state.user.writers.filter((c) => c !== payload);
    updateLocalStorageUser(state.user);
  },

  // updateDebt(state, payload) {
  //   state.debt = payload;
  // },

  updateUserDebt(state, payload) {
    // { title, author, amount }
    state.user.debt = payload;
    updateLocalStorageUser(state.user);
  },
};
function updateLocalStorageUser(user) {
  let u = JSON.parse(localStorage.getItem("users")) || [];
  let users = u.filter((u) => u.id !== user.id);
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
