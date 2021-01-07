<template>
    <section class="service-area section-padding pb-0 bg-color-light">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">{{ data.service.sectionTitleWaterText }}</span>
                        <h2 class="title">{{ data.service.sectionTitle }}</h2>
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="row mtn-30">
                        <div class="col-md-6 mt-30" v-for="service in data.service.services" :key="service.id">
                            <div class="service-item">
                                <div class="service-item__icon">
                                    <span>{{ service.serviceNo }}</span>
                                </div>
                                <div class="service-item__content">
                                    <h4 class="title">{{ service.title }}</h4>
                                    <p class="desc">{{ service.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="service-author">
                        <v-lazy-image src="/img/grad.png" class="img-fluid" alt="image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import data from '../data/service.json'
    export default {
        data () {
            return {
                data
            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';

    .service-item {
        color: $white;
        &__icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            line-height: 60px;
            text-align: center;
            background-color: $bg-dark;
            color: $theme-color-primary;
            font-size: 24px;
            font-weight: 600;
            font-family: $heading-font;
        }
        &__content {
            .title {
                font-family: $heading-font;
                padding: 20px 0 10px;
            }
            .desc {
                color: $paragraph-light;
                font-size: 14px;
            }
        }
    }
    .service-author {
        @media #{$md-device, $sm-device}{
            text-align: center;
            margin-top: 40px;
        }
    }
</style>