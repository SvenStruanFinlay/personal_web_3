<template>
    <footer class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-md-5 order-2 order-md-1">
                    <div class="copyright">
                        <p>{{ data.copyright }}</p>
                    </div>
                </div>
                <div class="col-md-7 order-1 order-md-2">
                    <div class="social">
                        <a :href="social.link" target="_blank" v-for="social in data.socials" :key="social.id">
                            {{ social.text }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import data from '../data/footer.json';
    export default {
        data () {
            return {
                data
            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .footer-area {
        color: $paragraph-light;
        font-size: 14px;
        padding: 30px 0;
        background-color: #0c0c0c;
    }
    .copyright {
        @media #{$sm-device}{
            text-align: center;
            padding-top: 10px;
        }
    }
    .social {
        text-align: right;
        // res
        @media #{$sm-device}{
            text-align: center;
        }
        a {
            color: $paragraph-light;
            line-height: 1;
            margin-left: 30px;
            // res
            @media #{$md-device, $xxs-device}{
                margin-left: 20px;
            }
            &:first-child {
                margin-left: 0;
            }
            &:hover {
                color: $theme-color-primary;
            }
        }
    }
</style>