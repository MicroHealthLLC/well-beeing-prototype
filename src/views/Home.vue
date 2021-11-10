<template>
  <v-row>
    <v-col>
      <span class="text-h6 text-sm-h5">My Goals</span>
      <v-divider class="mb-4"></v-divider>
      <v-card class=" pa-4 mb-4" elevation="5">
        <div v-for="(goal, index) in goals" :key="index">
          <div class="grid my-4">
            <div class="text-subtitle-2">
              <div>
                <v-icon class="mr-2" color="primary">mdi-flag</v-icon
                >{{ goal.title }}
              </div>
              <div class="mt-2">
                <v-chip class="mr-2" color="info" outlined small>{{
                  goal.category
                }}</v-chip>
                <v-chip color="info" outlined small
                  >Due Date: {{ goal.due_date }}</v-chip
                >
              </div>
            </div>
            <v-slider
              class="d-flex align-center"
              v-model="goal.progress"
              thumb-label="always"
              hide-details
            ></v-slider>
          </div>

          <v-divider v-if="index != goals.length - 1"></v-divider>
        </div>
        <div class="d-flex justify-end mt-5">
          <v-btn to="/activities" text color="info"
            >Schedule Activity Reminders
            <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </v-card>

      <!-- Latest Videos -->
      <span class="text-h6 text-sm-h5">Latest Videos</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(video, index) in videos" :key="index" elevation="5">
          <img class="image" :src="video.img" width="100%" />
          <v-card-title>{{ video.title }}</v-card-title>
          <v-card-subtitle>{{ video.author }}</v-card-subtitle>
          <v-card-text>
            {{ video.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Latest Podcasts -->
      <span class="text-h6 text-sm-h5">Latest Podcasts</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(podcast, index) in podcasts" :key="index" elevation="5">
          <img class="image" :src="podcast.img" width="100%" />
          <v-card-title>{{ podcast.title }}</v-card-title>
          <v-card-subtitle>{{ podcast.author }}</v-card-subtitle>
          <v-card-text>
            {{ podcast.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Latest Articles -->
      <span class="text-h6 text-sm-h5">Latest Articles</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container">
        <v-card v-for="(article, index) in articles" :key="index" elevation="5">
          <img class="image" :src="article.img" width="100%" />
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-subtitle>{{ article.author }}</v-card-subtitle>
          <v-card-text>
            {{ article.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      goals: [
        {
          title: "Improve my flexibility",
          progress: 25,
          category: "Yoga",
          due_date: "Nov 21",
        },
        {
          title: "Reduce my back pain when working",
          progress: 42,
          category: "Ergonmics",
          due_date: "Nov 28",
        },
        {
          title: "Improve my posture",
          progress: 10,
          category: "Posture",
          due_date: "Dec 24",
        },
      ],
      articles: [
        {
          title: "Title 1",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/ergonomics.jpg",
        },
        {
          title: "Title 2",
          text:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "First-name Last-name",
          img: "/img/meditate.jpg",
        },
        {
          title: "Title 3",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/nutrition.jpg",
        },
      ],
      videos: [
        {
          title: "Title 4",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/yoga.jpg",
        },
        {
          title: "Title 5",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/weight-training.jpg",
        },
        {
          title: "Title 6",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/endurance.jpg",
        },
      ],
      podcasts: [
        {
          title: "Title 7",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/challenge.jpg",
        },
        {
          title: "Title 8",
          text:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "First-name Last-name",
          img: "/img/posture.jpg",
        },
        {
          title: "Title 9",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/stretching.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
::v-deep .v-slider__thumb {
  height: 20px;
  width: 20px;
}
::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 10px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
