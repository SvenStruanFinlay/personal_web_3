<template>
  <div class="main-container">
       
    <Header />

    <div class="breadcrumb-area">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="breadcrumb-wrap text-center">
              <div class="section-title">
                <span class="water-text">About Me</span>
                <h1 class="title">About Me</h1>
              </div>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    About Me
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AboutDetails />

    <Resume />

    <Funfact />

    <Testimonial />

    <Footer />

    <OffCanvasMobileMenu />

    <BackToTop />
  </div>
</template>

<script>
import Header from "@/components/Header";
import AboutDetails from "@/components/AboutDetails";
import Resume from "@/components/Resume";
import Funfact from "@/components/Funfact";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import OffCanvasMobileMenu from "@/components/OffCanvasMobileMenu";
import BackToTop from "@/components/BackToTop";
import Skills from "@/components/Skills";

export default {
  components: {
    Header,
    AboutDetails,
    Resume,
    Funfact,
    Testimonial,
    Skills,
    Footer,
    OffCanvasMobileMenu,
    BackToTop,
  },
  metaInfo: {
    title: "About Me",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>
