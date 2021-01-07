<template>
    <section class="portfolio-area section-padding bg-color-dark">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">{{ data.portfolio.sectionTitleWaterText }}</span>
                        <h2 class="title">{{ data.portfolio.sectionTitle }}</h2>
                    </div>
                </div>
            </div>
            <div class="row align-items-center mbn-50">
                <div class="col-lg-3 col-sm-6" v-for="portfolio in data.portfolio.portfolioGallery.slice(0, 8)" :key="portfolio.id">
                    <PortfolioItem :portfolio="portfolio" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import data from '../data/portfolio.json';

    import PortfolioItem from '@/components/PortfolioItem';
    export default {
        components: {
            PortfolioItem,
        },
        data () {
            return {
                data
            }
        }
    };
</script>