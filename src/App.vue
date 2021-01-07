<template>
    <div id="app" class="vertical-line bg-color-dark">
        <div class="grid" v-for="i in 9" :key="i"></div>

        <router-view />
    </div>
</template>

<script>
    export default {
        components: {
            
        }
    }
</script>