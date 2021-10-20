<template>
  <v-app>
    <v-app-bar app color="var(--mh-blue)" dark>
      <div class="d-flex align-center">
        <h2>Well Beeing</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        Profile
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
:root {
  --mh-blue: #1d336f;
  --mh-green: #9ec64c;
  --mh-orange: #dd9036;
}
</style>
