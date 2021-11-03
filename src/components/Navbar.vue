<template>
  <v-app-bar absolute app>
    <img src="../assets/well-being-logo.png" width="150" />

    <v-tabs color="var(--mh-blue)" slider-size="4" centered optional>
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

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
a.v-tab {
  text-transform: capitalize;
}
</style>
