<template>
    <div class="resume-education">
        <h3 class="heading">{{ resume.heading }}</h3>
        <div class="resume-content">
            <div class="resume-item" v-for="resume in resume.resumes" :key="resume.id">
                <h6 class="ins-name">{{ resume.insName }}</h6>
                <h6 class="degree" v-html="resume.position">{{ resume.position }}</h6>
                <p>{{ resume.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['resume']
    };
</script>