<template>
    <div class="offcanvas-menu" id="offcanvas-menu">
        <div class="offcanvas-menu__inner">
            <div class="offcanvas-menu__header">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-md-6 col-8">
                            <div class="logo">
                                <router-link to="/">
                                    <img src="/img/logo_transparent.png" alt="Brand Logo">
                                </router-link>
                            </div>
                        </div>
                        <div class="col-md-6 col-4">
                            <div class="text-right">
                                <span class="mobile-navigation-close-icon" @click="mobiletoggleClass('removeClass', 'active')"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNavMenu />
        </div>
    </div>
</template>

<script>

    import MobileNavMenu from '../components/MobileNavMenu'

    export default {
        components: {
            MobileNavMenu
        },
        methods: {
            // offcanvas menu close
            mobiletoggleClass(addRemoveClass, className) {
                const el = document.querySelector('#offcanvas-menu');
                if (addRemoveClass === 'addClass') {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_variables.scss';

    .logo {
        img {
            width: 160px;
        }
    }
    
    .offcanvas-menu {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
        transition: 0.4s;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.7);
        visibility: hidden;
        opacity: 0;
    
        &__inner {
            transform: translateX(-100%);
            width: 400px;
            height: 100%;
            cursor: default;
            background-color: $bg-light;
            transition: 0.4s;
            overflow-y: auto;

            @media #{$sm-device}{
                width: 100%;
            }
        }

        &.active{
            .offcanvas-menu__inner {
                transform: translateX(0);
            }
            visibility: visible;
            opacity: 1;
        }

        &__header {
            background-color: $bg-dark;
            padding: 15px 0;
            .mobile-navigation-close-icon{
                position: relative;
                cursor: pointer;
                height: 40px;
                width: 40px;
                line-height: 40px;
                display: inline-block;
                &:before{
                    position: absolute;
                    top: 23px;
                    left: 8px;
                    content: '';
                    width: 24px;
                    height: 3px;
                    background: $white;
                    transform-origin: 50% 50%;
                    transform: rotate(45deg);
                    transition: 0.4s;
                }
                &:after {
                    position: absolute;
                    top: 23px;
                    left: 8px;
                    content: '';
                    width: 24px;
                    height: 3px;
                    background: $white;
                    transform-origin: 50% 50%;
                    transform: rotate(-45deg);
                    transition: 0.4s;
                }
                &:hover{
                    color: $theme-color-primary;
                    &:before, &:after{
                        transform: none;
                    }
                }
            }
        }
    }
</style>