<template>
  <v-row>
    <v-col>
      <v-card class="welcome-card pa-4" dark>
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
        <v-card-actions class="d-flex justify-end">
          <v-btn color="#dd9036">Some action</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
.welcome-card {
  background: rgb(158, 198, 76);
  background: linear-gradient(
    341deg,
    rgba(158, 198, 76, 1) 0%,
    rgba(29, 51, 111, 1) 100%
  );
}
</style>
