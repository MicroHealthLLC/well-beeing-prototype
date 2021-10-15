<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between mt-4">
        <h1>My Activities</h1>
        <v-btn color="info">Add New</v-btn>
      </div>

      <v-data-table @click:row="notifyMe" :headers="headers" :items="items">
        <template v-slot:item.category="{ item }">
          <span
            ><v-icon class="mr-4">{{ categoryIcon(item.category) }}</v-icon>
            {{ item.category }}</span
          >
        </template>
        <template v-slot:item.level="{ item }">
          <v-chip small :color="levelColor(item.level)">{{
            item.level
          }}</v-chip>
        </template>
      </v-data-table>
      <v-btn @click="notifyMe">Notify</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      headers: [
        {
          text: "Category",
          value: "category",
        },
        {
          text: "Level",
          value: "level",
        },
        {
          text: "Frequency",
          value: "frequency",
        },
        {
          text: "Time",
          value: "time",
        },
        {
          text: "Cycle",
          value: "cycle",
        },
      ],
      items: [
        {
          category: "Yoga",
          frequency: "Daily",
          time: "12:00PM",
          level: "Intermediate",
          cycle: 1,
        },
        {
          category: "Meditation",
          frequency: "Daily",
          time: "3:00PM",
          level: "Beginner",
          cycle: 1,
        },
        {
          category: "Stress Relief",
          frequency: "Daily",
          time: "9:00AM",
          level: "Advanced",
          cycle: 1,
        },
        {
          category: "Endurance",
          frequency: "Daily",
          time: "10:00AM",
          level: "Advanced",
          cycle: 1,
        },
        {
          category: "Ergonomics",
          frequency: "Daily",
          time: "8:00AM",
          level: "Beginner",
          cycle: 1,
        },
        {
          category: "Challenge",
          frequency: "Daily",
          time: "5:00PM",
          level: "Advanced",
          cycle: 1,
        },
        {
          category: "Muscle Tone/Movement",
          frequency: "Daily",
          time: "4:00PM",
          level: "Advanced",
          cycle: 1,
        },
        {
          category: "Stretching",
          frequency: "Daily",
          time: "3:00PM",
          level: "Intermediate",
          cycle: 1,
        },
      ],
    };
  },
  // Stress relief, Meditation, Yoga, Stretching, Posture, Ergonomics, Muscle Tone/Movement, Nutrition, Endurance, Challenges
  methods: {
    categoryIcon(category) {
      return category == "Yoga"
        ? "mdi-yoga"
        : category == "Meditation"
        ? "mdi-meditation"
        : category == "Stress Relief"
        ? "mdi-head-heart"
        : category == "Endurance"
        ? "mdi-run"
        : category == "Ergonomics"
        ? "mdi-seat-recline-extra"
        : category == "Challenge"
        ? "mdi-trophy-award"
        : category == "Muscle Tone/Movement"
        ? "mdi-weight-lifter"
        : category == "Stretching"
        ? "mdi-human"
        : category == "Posture"
        ? "mdi-human-male"
        : category == "Nutrition"
        ? "mdi-food-apple"
        : "mdi-run";
    },
    levelColor(level) {
      return level == "Beginner"
        ? "success"
        : level == "Intermediate"
        ? "warning"
        : level == "Advanced"
        ? "error"
        : "primary";
    },
    async notifyMe(activity) {
      const reg = await navigator.serviceWorker.getRegistration();
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        reg.showNotification(activity.category, {
          icon: "/img/icons/android-chrome-192x192.png",
          body: "This is your daily Well Beeing reminder!",
          actions: [
            {
              title: "View Video",
              action: "view-video",
            },
            {
              title: "Snooze",
              action: "snooze",
            },
          ],
        });
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            reg.showNotification(activity.category, {
              icon: "/img/icons/android-chrome-192x192.png",
              body: "This is your daily Well Beeing reminder!",
              actions: [
                {
                  title: "View Video",
                  action: "view-video",
                },
                {
                  title: "Snooze",
                  action: "snooze",
                },
              ],
            });
          }
        });
      }

      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them any more.
    },
  },
  computed: {
    //
  },
  mounted() {
    //
  },
};
</script>
