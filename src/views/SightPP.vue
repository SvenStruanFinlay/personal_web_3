<template>
  <div class="main-container">
    <Header />

    <div class="breadcrumb-area">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="breadcrumb-wrap text-center">
              <div class="section-title">
                <span class="water-text">Intel Sight++</span>
                <h2 class="title">Intel Sight++</h2>
              </div>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Intel Sight++
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-lg-8 offset-lg-3">
      <img src="/img/portfolio/sight/example.png" alt="" />
    </div> -->
    <ProjectDetailsWrapper projectData="SightPP" />

    <Footer />

    <OffCanvasMobileMenu />

    <BackToTop />
  </div>
</template>

<script>
import Header from "@/components/Header";
import ProjectDetailsWrapper from "@/components/ProjectDetailsWrapper";
import Footer from "@/components/Footer";
import OffCanvasMobileMenu from "@/components/OffCanvasMobileMenu";
import BackToTop from "@/components/BackToTop";

export default {
  components: {
    Header,
    ProjectDetailsWrapper,
    Footer,
    OffCanvasMobileMenu,
    BackToTop,
  },
  metaInfo: {
    title: "Project Details",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>
