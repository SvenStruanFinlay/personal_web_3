<template>
    <div class="blog-main-wrapper section-padding">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-4 order-2 order-lg-1 mtn-30 blog-widget__wrapper">
                    <SidebarWidget :sidebar="data.sidebar" />
                </div>

                <div class="col-xl-9 col-lg-8 order-1 order-lg-2">
                    <div class="row mtn-30">
                        <div class="col-xl-6 mt-30" v-for="blogPost in data.blog.blogPosts" :key="blogPost.id">
                            <BlogPost :blogData="blogPost" />
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="paginatoin-area text-center mt-40">
                                <ul class="pagination-box">
                                    <li>
                                        <a class="previous" href="javascript:void(0)">
                                            <i class="fa fa-angle-left"></i>
                                        </a>
                                    </li>
                                    <li class="active">
                                        <a href="javascript:void(0)">1</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">2</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">3</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">4</a>
                                    </li>
                                    <li>
                                        <a class="next" href="javascript:void(0)">
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../data/blog.json'

    import BlogPost from './BlogPost';
    import SidebarWidget from './SidebarWidget';
    export default {
        components: {
            BlogPost,
            SidebarWidget
        },
        data () {
            return {
                data,
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>