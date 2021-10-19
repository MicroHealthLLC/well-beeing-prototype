<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between mt-4">
        <h1>My Activities</h1>
        <v-btn @click="dialog = true" color="info">Add New</v-btn>
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
      <!-- Form Dialog -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>Add New Activity</v-card-title>
          <v-card-text>
            <v-select
              v-model="category"
              :items="categories"
              label="Category"
            ></v-select>
            <v-select
              v-model="level"
              :items="['Beginner', 'Intermediate', 'Advanced']"
              label="Level"
            ></v-select>
            <v-select
              v-model="frequency"
              :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
              label="Frequency"
            ></v-select>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Scheduled Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="time"
                format="24hr"
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="addActivity" class="px-6" color="info">Submit</v-btn>
            <v-btn @click="dialog = false" color="secondary" outlined
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-snackbar v-model="snackbar" color="success" top
      >Activity Successfully Added!</v-snackbar
    >
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dialog: false,
      category: "",
      level: "",
      frequency: "",
      time: null,
      categories: [
        "Challenge",
        "Endurance",
        "Ergonomics",
        "Meditation",
        "Muscle Tone/Movement",
        "Nutrition",
        "Posture",
        "Stress Relief",
        "Stretching",
        "Yoga",
      ],
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
          time: "12:00",
          level: "Intermediate",
          cycle: "1 of 10",
        },
        {
          category: "Meditation",
          frequency: "Mon/Wed/Fri",
          time: "14:30",
          level: "Beginner",
          cycle: "1 of 10",
        },
        {
          category: "Stress Relief",
          frequency: "Daily",
          time: "09:00",
          level: "Advanced",
          cycle: "1 of 10",
        },
        {
          category: "Endurance",
          frequency: "Daily",
          time: "10:00",
          level: "Advanced",
          cycle: "1 of 10",
        },
        {
          category: "Ergonomics",
          frequency: "Mon/Wed/Fri",
          time: "08:00",
          level: "Beginner",
          cycle: "1 of 10",
        },
        {
          category: "Challenge",
          frequency: "Daily",
          time: "05:00",
          level: "Advanced",
          cycle: "1 of 10",
        },
        {
          category: "Muscle Tone/Movement",
          frequency: "Tues/Thurs",
          time: "22:00",
          level: "Advanced",
          cycle: "1 of 10",
        },
        {
          category: "Stretching",
          frequency: "Daily",
          time: "11:00",
          level: "Intermediate",
          cycle: "1 of 10",
        },
      ],
      snackbar: false,
    };
  },
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
          image: this.imageURL(activity.category),
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
    addActivity() {
      this.items.unshift({
        category: this.category,
        level: this.level,
        frequency: this.frequency,
        time: this.time,
        cycle: "1 of 10",
      });

      this.dialog = false;
      this.snackbar = true;

      this.category = "";
      this.level = "";
      this.frequency = "";
    },
    imageURL(category) {
      if (category == "Yoga") {
        return "/img/yoga.jpg";
      } else if (category == "Meditation") {
        return "/img/meditate.jpg";
      } else if (category == "Stress Relief") {
        return "/img/stress-relief.jpg";
      } else if (category == "Endurance") {
        return "/img/endurance.jpg";
      } else if (category == "Challenge") {
        return "/img/challenge.jpg";
      } else if (category == "Muscle Tone/Movement") {
        return "/img/weight-training.jpg";
      } else if (category == "Stretching") {
        return "/img/stretching.jpg";
      } else if (category == "Nutrition") {
        return "/img/nutrition.jpg";
      }
    },
    checkReminders() {
      const now = new Date();

      const minutes = now.getMinutes();
      const hour = now.getHours();

      this.items.forEach((reminder) => {
        const time = reminder.time.split(":");
        if (time[0] == hour && time[1] == minutes) {
          console.log("Reminder found: Display Notification");
          this.notifyMe(reminder);
        } else {
          console.log("Reminder not found");
        }
      });
    },
  },
  computed: {
    //
  },
  async mounted() {
    setInterval(this.checkReminders, 10000);
  },
};
</script>

<style scoped>
::v-deep .text-start:first-child {
  font-weight: 600;
}
::v-deep tr:hover {
  cursor: pointer;
}
</style>
