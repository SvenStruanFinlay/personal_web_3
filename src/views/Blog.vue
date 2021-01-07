<template>
    <div class="main-container">

        <Header />

        <div class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="breadcrumb-wrap text-center">
                            <div class="section-title">
                                <span class="water-text">Latest Blog</span>
                                <h2 class="title">Latest Blog</h2>
                            </div>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/">Home</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Blog
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BlogMainWrapper />

        <Footer />

        <OffCanvasMobileMenu />

        <BackToTop />

    </div>
</template>

<script>
    import Header from '@/components/Header';
    import BlogMainWrapper from '@/components/BlogMainWrapper';
    import Footer from '@/components/Footer';
    import OffCanvasMobileMenu from '@/components/OffCanvasMobileMenu';
    import BackToTop from '@/components/BackToTop';
    export default {
        components: {
            Header,
            BlogMainWrapper,
            Footer,
            OffCanvasMobileMenu,
            BackToTop
        },
        metaInfo: {
            title: 'Latest Blog',
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        }
    }
</script>
