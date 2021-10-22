<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between my-4">
        <div class="d-flex">
          <h2>My Activity Reminders</h2>
          <v-switch
            v-model="remind"
            class="mt-1 ml-3"
            color="#2f53b6"
          ></v-switch>
        </div>
        <v-btn @click="openForm" color="#2f53b6" dark>Add New</v-btn>
      </div>
      <!-- Activity Reminders Table -->
      <v-data-table :headers="headers" :items="reminders">
        <template v-slot:item.category="{ item }">
          <span
            ><v-icon class="mr-4">{{ categoryIcon(item.category) }}</v-icon>
            {{ item.category }}</span
          >
        </template>
        <template v-slot:item.level="{ item }">
          <v-chip small :color="levelColor(item.level)" dark>{{
            item.level
          }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <v-btn
            @click="notify(item)"
            class="mr-3"
            color="var(--mh-blue)"
            outlined
            x-small
            title="Test Notification: Prototype Only"
            >Test</v-btn
          >
          <v-btn
            @click="deleteReminder(item, index)"
            color="var(--mh-orange)"
            outlined
            x-small
            depressed
            >Delete</v-btn
          >
        </template>
        <template v-slot:no-data>
          <div class="mt-4">
            <v-icon color="grey" x-large>mdi-alarm</v-icon>
            <p>No Activity Reminders</p>
          </div>
        </template>
      </v-data-table>
      <!-- Form Dialog -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>Add New Activity Reminder</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-select
                v-model="category"
                :items="categories"
                label="Category"
                :rules="[(v) => !!v || 'Category is required']"
                required
              ></v-select>
              <v-select
                v-model="level"
                :items="['Beginner', 'Intermediate', 'Advanced']"
                label="Level"
                :rules="[(v) => !!v || 'Level is required']"
                required
              ></v-select>
              <v-select
                v-model="frequency"
                :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
                label="Frequency"
                :rules="[(v) => !!v || 'Frequency is required']"
                required
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
                    :rules="[(v) => !!v || 'Time is required']"
                    required
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="time"
                  format="24hr"
                  @click:minute="$refs.menu.save(time)"
                  header-color="var(--mh-blue)"
                ></v-time-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="addReminder" class="px-6" color="var(--mh-blue)" dark
              >Submit</v-btn
            >
            <v-btn @click="dialog = false" color="secondary" outlined
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      dialog: false,
      remind: false,
      intervalId: null,
      valid: true,
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
      categoryIcons: {
        Challenge: "mdi-trophy-award",
        Endurance: "mdi-run",
        Ergonomics: "mdi-seat-recline-extra",
        Meditation: "mdi-meditation",
        "Muscle Tone/Movement": "mdi-weight-lifter",
        Nutrition: "mdi-food-apple",
        Posture: "mdi-human-male",
        "Stress Relief": "mdi-head-heart",
        Stretching: "mdi-human",
        Yoga: "mdi-yoga",
      },
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
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
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
      reminders: [],
    };
  },
  methods: {
    ...mapMutations(["SET_SNACKBAR"]),
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
    openForm() {
      this.dialog = true;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
    addReminder() {
      if (this.$refs.form.validate()) {
        this.reminders.unshift({
          category: this.category,
          level: this.level,
          frequency: this.frequency,
          time: this.time,
          cycle: "1 of 10",
        });
        // Convert and add reminders array to local storage
        const parsed = JSON.stringify(this.reminders);
        localStorage.setItem("reminders", parsed);
        // Close form and display success message
        this.dialog = false;
        this.SET_SNACKBAR({
          show: true,
          message: "Activity Successfully Added!",
          color: "success",
        });
        // Reset form values
        this.resetForm();
      }
    },
    deleteReminder(reminder, index) {
      this.reminders.splice(index, 1);
      // Convert and update reminders array to local storage
      const parsed = JSON.stringify(this.reminders);
      localStorage.setItem("reminders", parsed);
      // Display successful delete message
      this.SET_SNACKBAR({
        show: true,
        message: "Activity Removed",
        color: "var(--mh-orange)",
      });
    },
    resetForm() {
      this.category = "";
      this.level = "";
      this.frequency = "";
      this.time = null;
    },
    imageURL(category) {
      return this.imageURLs[category] || "";
    },
    categoryIcon(category) {
      return this.categoryIcons[category] || "";
    },
    levelColor(level) {
      return level == "Beginner"
        ? "var(--mh-green)"
        : level == "Intermediate"
        ? "var(--mh-orange)"
        : level == "Advanced"
        ? "error"
        : "primary";
    },
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
    this.remind = true;

    if (localStorage.getItem("reminders")) {
      try {
        this.reminders = JSON.parse(localStorage.getItem("reminders"));
      } catch (e) {
        localStorage.removeItem("reminders");
      }
    }
  },
  watch: {
    remind(newSwitchValue, oldSwitchValue) {
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

<style scoped>
::v-deep .text-start:first-child {
  font-weight: 600;
}
::v-deep tr:hover {
  cursor: pointer;
}
::v-deep tr.v-data-table__empty-wrapper {
  margin: auto;
}
</style>
