<template>
    <back-to-top class="scroll-top">
        <i class="fa fa-angle-up"></i>
    </back-to-top>
</template>

<script>
    export default {

    };
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_variables.scss';
    .scroll-top {
        color: $white;
        font-size: 25px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        background-color: $theme-color-primary;
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.3);
        &:hover {
            background-color: $theme-color-secondary;
        }
    }
</style>