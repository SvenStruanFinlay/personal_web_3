<template>
    <section class="blog-area section-padding bg-color-light fix">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">{{ data.blog.sectionTitleWaterText }}</span>
                        <h2 class="title">{{ data.blog.sectionTitle }}</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="blog-carousel">
                        <swiper :options="swiperOption">
                            <div class="swiper-slide" v-for="blogPost in data.blog.blogPosts" :key="blogPost.id">
                                <BlogPost :blogData="blogPost" />
                            </div>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import BlogPost from '@/components/BlogPost';

    import data from '../data/blog.json';

    export default {
        components: {
            BlogPost,
        },
        data () {
            return {
                data,
                swiperOption: {
                    loop: true,
                    speed: 1000,
                    watchSlidesVisibility: true,
                    spaceBetween : 30,
                    // Responsive breakpoints
                    breakpoints: {
                        1200:{
                            slidesPerView : 3
                        },

                        768:{
                            slidesPerView : 2
                        },

                        575:{
                            slidesPerView : 1
                        }
                    }
                }
            }
        }
    };
</script>