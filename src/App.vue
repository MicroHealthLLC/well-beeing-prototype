<template>
  <v-app>
    <Navbar />
    <!-- Main Content -->
    <v-main class="main-wrapper" app>
      <!-- Welcome Banner -->
      <v-sheet v-if="$route.name == 'Home'" class="pa-5 welcome-card" dark app>
        <p class="text-h5 font-weight-bold text-center">
          Well-Beeing is here to help change your life for the better!
        </p>
        <p class="text-subtitle-2 text-center">
          Whether reminding you to get moving, check your health, or take a
          mindful moment, Well-Beeing promotes a healthy lifestyle.
        </p>
        <p class="text-subtitle-1 text-center">
          Remember, a better YOU means a better MicroHealth!
        </p>
        <div class="d-flex justify-center">
          <v-btn to="/activities" color="var(--mh-orange)"
            ><v-icon class="mr-2">mdi-alarm</v-icon> Schedule Reminder</v-btn
          >
        </div>
      </v-sheet>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      imageURLs: {
        Challenge: "/img/challenge.jpg",
        Endurance: "/img/endurance.jpg",
        Ergonomics: "",
        Meditation: "/img/meditate.jpg",
        "Muscle Tone/Movement": "/img/weight-training.jpg",
        Nutrition: "/img/nutrition.jpg",
        Posture: "",
        "Stress Relief": "/img/stress-relief.jpg",
        Stretching: "/img/stretching.jpg",
        Yoga: "/img/yoga.jpg",
      },
    };
  },
  methods: {
    ...mapActions(["fetchReminders"]),
    ...mapMutations(["CLOSE_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
    checkReminders() {
      // Get current time for check
      const now = new Date();
      const minutes = now.getMinutes();
      const hour = now.getHours();
      const day = now.getDay();
      // Compare current time with each reminder
      this.filteredReminders.forEach((reminder) => {
        const time = reminder.time.split(":");
        if (time[0] == hour && time[1] == minutes) {
          console.log("Reminder found: Display Notification");
          this.notify(reminder);
        } else {
          console.log("Reminder not found");
        }
      });
    },
    async notify(activity) {
      const reg = await navigator.serviceWorker.getRegistration();
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        reg.showNotification(activity.category, this.notification(activity));
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            reg.showNotification(
              activity.category,
              this.notification(activity)
            );
          }
        });
      }
    },
    // Helper method for notify - Provides Notification options
    notification(activity) {
      return {
        icon: "/img/icons/android-chrome-192x192.png",
        body: "This is your daily Well Beeing reminder!",
        image: this.imageURL(activity.category),
        actions: [
          {
            title: "View Content",
            action: "view-content",
          },
          {
            title: "Snooze",
            action: "snooze",
          },
        ],
      };
    },
    imageURL(category) {
      return this.imageURLs[category] || "";
    },
    frequencyDays(frequency) {
      if (frequency == "Mon/Wed/Fri") {
        return [1, 3, 5];
      } else if (frequency == "Tues/Thurs") {
        return [2, 4];
      } else {
        return [0, 1, 2, 3, 4, 5, 6];
      }
    },
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn", "snackbar"]),
    filteredReminders() {
      const now = new Date();
      const day = now.getDay();
      // Only return reminders with matching alarm day
      return this.reminders.filter((reminder) =>
        this.frequencyDays(reminder.frequency).includes(day)
      );
    },
  },
  mounted() {
    this.fetchReminders();
    this.TOGGLE_REMINDERS_ON(true);
  },
  watch: {
    remindersOn(newSwitchValue, oldSwitchValue) {
      if (newSwitchValue) {
        this.intervalId = setInterval(this.checkReminders, 60000);
      } else {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
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
