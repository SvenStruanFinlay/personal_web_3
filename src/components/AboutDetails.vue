<template>
    <div class="about-area section-padding">
        <div class="container">
            <div class="row">
                <div class="col-xl-4 col-lg-5">
                    <div class="about-image">
                        <v-lazy-image :src="data.aboutDetails.image" alt="author photo" />
                    </div>
                </div>
                <div class="col-xl-7 offset-xl-1 col-lg-7">
                    <div class="about-info">
                        <h3 class="title" v-html="data.aboutDetails.heading">{{ data.aboutDetails.heading }}</h3>
                        <p>{{ data.about.aboutMe }}</p>
                        <div class="personal-info">
                            <ul>
                                <li v-for="list in data.aboutDetails.infoList" :key="list.id">
                                    <b>{{ list.label }}</b>
                                    {{ list.info }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../data/about.json';
    export default {
        data (){
            return {
                data
            }
        }
    };
</script>