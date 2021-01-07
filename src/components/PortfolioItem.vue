<template>
    <div class="portfolio-item">
        <div class="portfolio-item__thumb">
            <router-link :to="portfolio.link">
                <v-lazy-image :src="portfolio.image" alt="portfolio image" />
            </router-link>
        </div>
        <div class="portfolio-item__content">
            <h4 class="portfolio-title">
                <router-link :to="portfolio.link">{{ portfolio.title }}</router-link>
            </h4>
            <p>{{ portfolio.desc }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['portfolio']
    };
</script>