<template>
  <div class="main-container">
    <Header />


    <Hero />

    <AboutMe />

    <PortfolioGallery />

    <Service />

    <Skills />

    <Funfact />

    <Testimonial />

    <!-- <BlogSection /> -->

    <Footer />

    <OffCanvasMobileMenu />

    <BackToTop />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import PortfolioGallery from "@/components/PortfolioGallery";
import Service from "@/components/Service";
import Funfact from "@/components/Funfact";
import Testimonial from "@/components/Testimonial";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import OffCanvasMobileMenu from "@/components/OffCanvasMobileMenu";
import BackToTop from "@/components/BackToTop";
import Skills from "@/components/Skills";

export default {
  components: {
    Header,
    Hero,
    AboutMe,
    PortfolioGallery,
    Service,
    Funfact,
    Testimonial,
    BlogSection,
    Footer,
    OffCanvasMobileMenu,
    BackToTop,
    Skills
  },
  metaInfo: {
    title: "Sven SF",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>