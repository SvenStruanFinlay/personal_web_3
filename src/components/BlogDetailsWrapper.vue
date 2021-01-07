<template>
    <div class="blog-main-wrapper section-padding">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-4 order-2 order-lg-1 mtn-30 blog-widget__wrapper">
                    <SidebarWidget :sidebar="data.sidebar" />
                </div>

                <div class="col-xl-9 col-lg-8 order-1 order-lg-2">
                    <BlogDetailsPost :blog="data.blogDetails" />
                    
                    <div class="about-author mt-70">
                        <div class="about-author__image">
                            <img :src="data.blogDetails.aboutAuthor.image" alt="author thumb">
                        </div>
                        <div class="about-author__content">
                            <h4 class="heading">{{ data.blogDetails.aboutAuthor.heading }}</h4>
                            <p>{{ data.blogDetails.aboutAuthor.text }}</p>
                            <h6 class="author-name">{{ data.blogDetails.aboutAuthor.name }}</h6>
                        </div>
                    </div>

                    <BlogComment :comment="data.blogComment" />

                    <BlogCommentForm />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../data/blog.json'

    import BlogDetailsPost from '@/components/BlogDetailsPost';
    import SidebarWidget from '@/components/SidebarWidget';
    import BlogComment from '@/components/BlogComment';
    import BlogCommentForm from '@/components/BlogCommentForm';
    export default {
        components: {
            BlogDetailsPost,
            SidebarWidget,
            BlogComment,
            BlogCommentForm
        },
        data () {
            return {
                data,
            }
        }
    };
</script>