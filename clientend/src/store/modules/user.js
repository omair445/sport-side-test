import 'firebase/auth';
import axios from 'axios';
import { currentUser, isAuthGuardActive } from '../../constants/config';
import { getCurrentUser, setCurrentUser } from '../../utils';

export default {
  state: {
    currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
    processing: (state) => state.processing,
    loginError: (state) => state.loginError,
    forgotMailSuccess: (state) => state.forgotMailSuccess,
    resetPasswordSuccess: (state) => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
      state.processing = false;
      state.loginError = null;
    },
    setLogout(state) {
      state.currentUser = null;
      state.processing = false;
      state.loginError = null;
    },
    setProcessing(state, payload) {
      state.processing = payload;
      state.loginError = null;
    },
    setError(state, payload) {
      state.loginError = payload;
      state.currentUser = null;
      state.processing = false;
    },
    setForgotMailSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.forgotMailSuccess = true;
    },
    setResetPasswordSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.resetPasswordSuccess = true;
    },
    clearError(state) {
      state.loginError = null;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError');
      commit('setProcessing', true);
      axios
        .post('http://localhost:3000/v1/auth/login', payload)
        .then((response) => {
          const { data } = response;
          const item = {
            uid: data.user.id,
            id: data.user.id,
            title: data.user.name,
            img: currentUser.img,
            date: currentUser.img,
            role: currentUser.role,
            tokens: data.tokens,
          };
          setCurrentUser(item);
          commit('setUser', item);
        })
        .catch((err) => {
          setCurrentUser(null);
          commit('setError', err.response.data.message);
          setTimeout(() => {
            commit('clearError');
          }, 3000);
        });
    },
    register({ commit }, payload) {
      commit('clearError');
      commit('setProcessing', true);
      axios
        .post('http://localhost:3000/v1/auth/register', payload)
        .then((response) => {
          const { data } = response;
          const item = {
            uid: data.user.id,
            id: data.user.id,
            title: data.user.name,
            img: currentUser.img,
            date: currentUser.img,
            role: currentUser.role,
            tokens: data.tokens,
          };
          // debugger;
          setCurrentUser(item);
          commit('setUser', item);
        })
        .catch((err) => {
          // debugger;
          setCurrentUser(null);
          commit('setError', err.response.data.message);
          setTimeout(() => {
            commit('clearError');
          }, 3000);
        });
    },

    signOut({ commit }) {
      setCurrentUser(null);
      commit('setLogout');
    },
  },
};
