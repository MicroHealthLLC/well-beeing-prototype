<template>
  <v-app>
    <v-app-bar absolute app>
      <img src="./assets/well-being-logo.png" width="150" />

      <v-tabs color="var(--mh-blue)" slider-size="4" centered>
        <v-tabs-slider color="var(--mh-green)"></v-tabs-slider>
        <v-tab to="/"><v-icon class="mr-1">mdi-home</v-icon>Home</v-tab>
        <v-tab to="/activities"
          ><v-icon class="mr-1">mdi-yoga</v-icon>Activities</v-tab
        >
        <v-tab to="/health"
          ><v-icon class="mr-1">mdi-heart-pulse</v-icon>Health</v-tab
        >
        <v-tab to="/time"><v-icon class="mr-1">mdi-alarm</v-icon>Time</v-tab>
      </v-tabs>

      <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
    </v-app-bar>

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
        <v-btn color="#dd9036">View Activities</v-btn>
      </div>
    </v-banner>

    <v-main class="main-wrapper" app>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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

export default {
  name: "App",
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
a.v-tab {
  text-transform: capitalize;
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
