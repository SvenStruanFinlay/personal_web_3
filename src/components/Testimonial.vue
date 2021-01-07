<template>
    <section class="testimonial-section bg-color-dark img-cover" :style="{ backgroundImage: `url(${data.bgImage})` }">
            <div class="testimonial-bg section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="testimonial-active">
                                <swiper :options="swiperOption">
                                    <div class="swiper-slide testimonial-item" v-for="testimonial in data.testimonials" :key="testimonial.id">
                                        <div class="testimonial-inner text-center">
                                            <div class="icon">
                                                <img src="/img/icon/quote.png" alt="quote icon">
                                            </div>
                                            <p class="testimonial-desc">{{ testimonial.desc }}</p>
                                            <div class="client-info">
                                                <h6 class="client-name">{{ testimonial.author }}</h6>
                                                <span class="client-desig">{{ testimonial.designation }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
    import data from '../data/testimonial.json';
    export default {
        data () {
            return {
                data,
                swiperOption: {
                    slidesPerView : 1,
                    loop: true,
                    speed: 1000,
                    delay: 10000,
                    autoplay: true,
                    spaceBetween : 30,
                    pagination: {
                        el: '.swiper-pagination-3',
                        type: 'bullets',
                        clickable: true
                    }
                }
            }
        }
    };
</script>