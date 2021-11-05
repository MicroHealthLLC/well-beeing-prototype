<template>
  <v-row>
    <v-col>
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
      articles: [
        {
          title: "Title 1",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/challenge.jpg",
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
        {
          title: "Title 4",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/stress-relief.jpg",
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
</style>
