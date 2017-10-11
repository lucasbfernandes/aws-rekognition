const actions = {
  setLoading({ commit }, loadingState) {
    commit('setLoading', loadingState);
  },
};

const mutations = {
  setLoading(state, loadingState) {
    state.isLoading = loadingState;
  },
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
};

const state = {
  isLoading: false,
};

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};