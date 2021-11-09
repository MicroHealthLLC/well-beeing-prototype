<template>
  <v-row>
    <v-col>
      <div class="d-sm-flex justify-space-between align-center my-2 my-sm-4">
        <div class="d-flex justify-space-between align-center">
          <span class="text-h6 text-sm-h5">My Activity Reminders</span>
          <v-switch
            v-model="remind"
            class="mt-1 ml-3"
            color="#2f53b6"
            hide-details
          ></v-switch>
        </div>
        <v-btn
          @click="openForm"
          class="my-5 my-sm-0"
          color="#2f53b6"
          dark
          :block="$vuetify.breakpoint.xsOnly"
          >Add New</v-btn
        >
      </div>
      <!-- Activity Reminders Table -->
      <v-card class="pa-sm-2">
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
              @click="removeReminder(item, index)"
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
      </v-card>
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
              <v-select
                v-model="contentType"
                label="Content Type"
                :items="['Articles', 'Blogs', 'Podcasts', 'Videos']"
                :rules="[(v) => !!v || 'Content Type is required']"
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
            <v-btn
              @click="addNewReminder"
              class="px-6"
              color="var(--mh-blue)"
              dark
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { notification } from "../mixins/notification.js";

export default {
  name: "Activities",
  mixins: [notification],
  data() {
    return {
      dialog: false,
      intervalId: null,
      valid: true,
      category: "",
      level: "",
      frequency: "",
      contentType: "",
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
          text: "Content Type",
          value: "contentType",
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
    };
  },
  methods: {
    ...mapActions(["addReminder", "deleteReminder"]),
    ...mapMutations(["SET_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
    openForm() {
      this.dialog = true;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
    addNewReminder() {
      if (this.$refs.form.validate()) {
        const newReminder = {
          category: this.category,
          level: this.level,
          frequency: this.frequency,
          contentType: this.contentType,
          time: this.time,
          cycle: "1 of 10",
        };
        // Call Vuex action to add reminder
        this.addReminder(newReminder);
        // Close form and reset form values
        this.dialog = false;
        this.resetForm();
      }
    },
    removeReminder(reminder, index) {
      this.deleteReminder(index);
    },
    resetForm() {
      this.category = "";
      this.level = "";
      this.frequency = "";
      this.contentType = "";
      this.time = null;
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
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn"]),
    remind: {
      get() {
        return this.remindersOn;
      },
      set(value) {
        this.TOGGLE_REMINDERS_ON(value);
      },
    },
  },
  mounted() {
    //
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
