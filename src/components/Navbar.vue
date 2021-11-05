<template>
  <div>
    <v-app-bar absolute app>
      <v-icon
        v-if="$vuetify.breakpoint.xsOnly"
        @click="drawer = !drawer"
        class="mr-2"
        >mdi-menu</v-icon
      >
      <router-link to="/"
        ><v-img src="../assets/well-being-logo.png" width="150"
      /></router-link>

      <v-tabs
        v-if="!$vuetify.breakpoint.xsOnly"
        color="var(--mh-blue)"
        slider-size="4"
        centered
        optional
      >
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

      <v-menu v-if="!$vuetify.breakpoint.xsOnly" offset-y>
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
    <!-- Side Navigation -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <v-list-item-group color="var(--mh-orange)">
          <v-list-item to="/" link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/activities" link>
            <v-list-item-icon>
              <v-icon>mdi-yoga</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/health" link>
            <v-list-item-icon>
              <v-icon>mdi-heart-pulse</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Health</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/time" link>
            <v-list-item-icon>
              <v-icon>mdi-alarm</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Time</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item to="/profile" link>
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-content
              ><v-list-item-title
                >Profile</v-list-item-title
              ></v-list-item-content
            >
          </v-list-item>
        </v-list>
        <div class="pa-2">
          <v-btn color="var(--mh-blue)" block dark>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
a.v-tab {
  text-transform: capitalize;
}
</style>
