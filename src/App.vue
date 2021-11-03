<template>
  <v-app>
    <Navbar />
    <!-- Welcome Banner -->
    <v-banner v-if="$route.name == 'Home'" class="welcome-card" dark app>
      <p class="text-h5 font-weight-bold text-center">
        Well-Beeing is here to help change your life for the better!
      </p>
      <p class="text-subtitle-1 text-center">
        Whether reminding you to get moving, check your health, or take a
        mindful moment, Well-Beeing promotes a healthy lifestyle.
      </p>
      <p class="text-subtitle-1 text-center">
        Remember, a better YOU means a better MicroHealth!
      </p>
      <div class="d-flex justify-center">
        <v-btn color="var(--mh-orange)">View Activities</v-btn>
      </div>
    </v-banner>
    <!-- Main Content -->
    <v-main class="main-wrapper" app>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- Alert Message -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top
      >{{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="CLOSE_SNACKBAR">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapMutations(["CLOSE_SNACKBAR"]),
  },
  computed: {
    ...mapGetters(["snackbar"]),
  },
};
</script>

<style>
:root {
  --mh-blue: #1d336f;
  --mh-green: #9ec64c;
  --mh-orange: #dd9036;
}
.main-wrapper {
  background-color: #f0f3f7;
}
.welcome-card {
  background: rgb(158, 198, 76);
  background: linear-gradient(
    341deg,
    rgba(158, 198, 76, 1) 0%,
    rgba(29, 51, 111, 1) 100%
  );
}
</style>
