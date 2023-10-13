import { createStore } from 'vuex';

const store = createStore({
  state: {
    query: "",
    fileName: [],
    triggerSearchInIframe: false,
    user:"",
  },
  mutations: {
    setQuery(state, query) {
        state.query = query
    },
    setFileName(state, fileName) {
      state.fileName = fileName
    },
    setUser(state, user) {
      state.user = user
    },
    toggleTriggerSearchInIframe(state) {
      state.triggerSearchInIframe = !state.triggerSearchInIframe;
    }
  },
  actions: {
    activateSearchInIframe({ commit }) {
      commit('toggleTriggerSearchInIframe');
    }
  }
});

export default store;
