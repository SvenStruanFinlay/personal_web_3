<template>
    <div class="resume-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <span class="water-text">{{ data.sectionTitleWaterText }}</span>
                        <h2 class="title">{{ data.sectionTitle }}</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <ResumeList :resume="data.education" />
                </div>
                <div class="col-md-6 professional">
                    <ResumeList :resume="data.professional" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from "../data/resume.json";

    import ResumeList from '@/components/ResumeList';
    export default {
        components: {
            ResumeList,
        },
        data () {
            return {
                data
            }
        }
    };
</script>