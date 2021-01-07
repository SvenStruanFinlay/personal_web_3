<template>
    <div class="page-wrapper section-padding">
        <div class="project-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-12 section-space--bottom--30">
                        <div class="project-information">
                            <h3 class="title">{{ data.projects[projectData].projectDetailsInfo.title }}</h3>
                            <ul class="project-information__list">
                                <li v-for="list in data.projects[projectData].projectDetailsInfo.lists" :key="list.id">
                                    <strong>{{ list.label }} </strong> {{ list.desc }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                        <div class="project-details">
                            <h2 class="title">{{ data.projects[projectData].projectDetails.projectDetailsTitle }}</h2>
                            <p v-html="data.projects[projectData].projectDetails.projectDetailsDesc">{{ data.projects[projectData].projectDetails.projectDetailsDesc.split("\n") }}</p>
                            <div class="screenshot-gallery">
                                <h2 class="screenshot-title">Project Screenshot</h2>
                                <swiper :options="swiperOption">
                                    <div class="swiper-slide" v-for="image in data.projects[projectData].projectDetails.images" :key="image.id">
                                        <div class="screenshot-image">
                                            <img :src="image.image" alt="screenshot image">
                                        </div>
                                    </div>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../data/portfolio.json'
    
    export default {
        props: ['projectData'],
        data () {
            return {
                data,
                swiperOption: {
                    slidesPerView : 2,
                    loop: true,
                    speed: 1000,
                    autoplay: true,
                    spaceBetween : 50,
                    // Responsive breakpoints
                    breakpoints: {
                        576:{
                            slidesPerView : 2
                        },
                        320:{
                            slidesPerView : 1
                        }
                    }
                }
            }
        }
    };
</script>