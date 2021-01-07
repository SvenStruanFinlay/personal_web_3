<template>
    <div class="main-container">

        <Header />

        <div class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="breadcrumb-wrap text-center">
                            <div class="section-title">
                                <span class="water-text">Blog Details</span>
                                <h1 class="title">Blog Details</h1>
                            </div>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/">Home</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Blog Details
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BlogDetailsWrapper />

        <Footer />

        <OffCanvasMobileMenu />

        <BackToTop />

    </div>
</template>

<script>
    import Header from '@/components/Header';
    import BlogDetailsWrapper from '@/components/BlogDetailsWrapper';
    import Footer from '@/components/Footer';
    import OffCanvasMobileMenu from '@/components/OffCanvasMobileMenu';
    import BackToTop from '@/components/BackToTop';
    export default {
        components: {
            Header,
            BlogDetailsWrapper,
            Footer,
            OffCanvasMobileMenu,
            BackToTop
        },
        metaInfo: {
            title: 'Blog Details',
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        }
    }
</script>
