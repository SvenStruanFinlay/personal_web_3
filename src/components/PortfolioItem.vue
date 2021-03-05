<template>
  <div class="card">
    <div class="portfolio-item">
      <div class="portfolio-item__thumb">
        <router-link :to="portfolio.link">
          <v-lazy-image :src="portfolio.image" alt="portfolio image" />
        </router-link>
      </div>
      <div class="portfolio-item__content">
        <h4 class="portfolio-title">
          <router-link :to="portfolio.link">{{ portfolio }}</router-link>
        </h4>
        <p>{{ portfolio.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 270px;
  transition: transform 0.2s; /* Animation */
  width: 275px;
  background-color: inherit;
  border: 3px solid white;
}

.card:hover {
  transform: scale(
    1.1
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>

<script>
export default {
  props: ["portfolio"],
};
</script>