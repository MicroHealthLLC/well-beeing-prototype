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
</style>
