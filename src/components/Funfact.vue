<template>
    <section class="funfact-area section-padding pb-0 bg-color-dark">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">My Challenge</span>
                        <h2 class="title">My Challenge</h2>
                    </div>
                </div>
            </div>
            <div class="row mtn-50">
                <div class="col-md-3 col-sm-6 mt-50" v-for="item in data.funfacts" :key="item.id">
                    <div class="funfact-item text-center">
                        <span class="counter">
                            <ICountUp 
                                :endVal="item.counter"
                            />
                        </span>
                        <h6>{{ item.title }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ICountUp from 'vue-countup-v2';
    import data from '../data/funfacts.json';
    export default {
        components: {
            ICountUp
        },
        data () {
            return {
                data
            }
        }
    };
</script>