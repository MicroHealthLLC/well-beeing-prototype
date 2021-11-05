import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: [],
    remindersOn: false,
    snackbar: {
      show: false,
      message: "",
      color: "",
    },
  },
  actions: {
    fetchReminders({ commit }) {
      if (localStorage.getItem("reminders")) {
        try {
          let localReminders = JSON.parse(localStorage.getItem("reminders"));
          commit("SET_REMINDERS", localReminders);
        } catch (e) {
          localStorage.removeItem("reminders");
        }
      }
    },
    addReminder({ commit, getters }, reminder) {
      const reminders = getters.reminders;
      reminders.unshift(reminder);
      commit("SET_REMINDERS", reminders);
      // Convert and add reminders array to local storage
      const parsed = JSON.stringify(reminders);
      localStorage.setItem("reminders", parsed);
      // Display success message
      commit("SET_SNACKBAR", {
        show: true,
        message: "Activity Successfully Added!",
        color: "var(--mh-green)",
      });
    },
    deleteReminder({ commit, getters }, index) {
      const reminders = getters.reminders;
      reminders.splice(index, 1);
      commit("SET_REMINDERS", reminders);
      // Convert and update reminders array to local storage
      const parsed = JSON.stringify(reminders);
      localStorage.setItem("reminders", parsed);
      // Display successful delete message
      commit("SET_SNACKBAR", {
        show: true,
        message: "Activity Reminder Removed",
        color: "var(--mh-orange)",
      });
    },
  },
  mutations: {
    SET_REMINDERS: (state, reminders) => (state.reminders = reminders),
    TOGGLE_REMINDERS_ON: (state, on) => (state.remindersOn = on),
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
  },

  getters: {
    reminders: (state) => state.reminders,
    remindersOn: (state) => state.remindersOn,
    snackbar: (state) => state.snackbar,
  },
  modules: {},
});
