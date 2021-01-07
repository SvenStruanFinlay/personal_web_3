<template>
    <fixed-header>
        <div class="header-navigation-area header-transparent">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 col-lg-3 col-8">
                        <div class="logo">
                            <router-link to="/">
                                <img src="/img/logo_transparent.png" alt="Brand Logo">
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-9 d-none d-lg-block">
                        <nav class="main-menu">
                            <ul>
                                <li>
                                    <router-link to="/">HOME</router-link>
                                </li>
                                <li>
                                    <router-link to="/about">ABOUT ME</router-link>
                                </li>
                                <li>
                                    <router-link to="/project">PROJECT</router-link>
                                    <ul class="submenu">
                                        <li>
                                            <router-link to="/project">Projects</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/intel-sightpp">Intel Sight++</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/ibm-chatbot">IBM Chatbot</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/personal-website">Personal Website</router-link>
                                        </li>
                                    </ul>
                                </li>
                                    <!-- <li>
                                        <router-link to="/blog">BLOG</router-link>
                                        <ul class="submenu">
                                            <li>
                                                <router-link to="/blog">Blog</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/blog-details">Blog Details</router-link>
                                            </li>
                                        </ul>
                                    </li> -->
                                <li>
                                    <router-link to="/contact">CONTACT</router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-6 col-4 d-block d-lg-none">
                        <div class="mobile-navigation-icon" @click="mobiletoggleClass('addClass', 'active')">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </fixed-header>
</template>

<script>
    import FixedHeader from 'vue-fixed-header'
    export default {
        components: {
            FixedHeader,
        },
        methods: {
            // offcanvas mobilemenu
            mobiletoggleClass(addRemoveClass, className) {
                const el = document.querySelector('#offcanvas-menu');
                if (addRemoveClass === 'addClass') {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
        },
    };
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';

    .header-transparent {
        top: 0;
        left: 0;
        width: 100%;
        position: fixed;
        z-index: 999;
        background-color: transparent;
        &.vue-fixed-header--isFixed {
            background-color: #0c0c0c;
            box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.3);
            animation: 900ms cubic-bezier(0.2, 1, 0.22, 1) 0s normal none 1 running fadeInDown;
        }
    }
    .mobile-navigation-icon {
        width: 26px;
        height: 20px;
        cursor: pointer;
        float: right;
        position: relative;
        
        i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 2px;
            background-color: $white;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            &:before,
            &:after {
                content: "";
                bottom: 8px;
                left: 0;
                width: 100%;
                height: 2px;
                position: absolute;
                background-color: $white;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            &:after {
                bottom: -8px;
            }
        }
    }
    
</style>