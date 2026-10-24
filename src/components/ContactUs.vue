<template>
    <section class="contact-us-area section-padding bg-color-dark img-cover">
        <div class="container">
            <div class="row d-none">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">{{ data.sectionTitleWaterText }}</span>
                        <h2 class="title">{{ data.sectionTitle }}</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="contact-info text-center">
                        <div class="contact-info__list email">
                            <i class="fa fa-envelope"></i>
                            <a href="mailto:job@svensfinlay.tech">job@svensfinlay.tech</a>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-8 offset-lg-2">
                <Email/>
            </div>
            </div>
        </div>
    </section>
</template>

<script>
    import data from '../data/contact.json';
    import Email from '@/components/Email';
    export default {
  components: { Email },
        data () {
            return {
                data
            }
        }
    };
</script>
