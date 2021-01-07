<template>
    <div class="main-container">
        
    <div class="about_me">
          <vue-particles
        class="particle"
        color="#a7a7a7"
        :particleOpacity="0.7"
        :particlesNumber="20"
        shapeType="polygon"
        :particleSize="4"
        linesColor="#a7a7a7"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="repulse"
        
      >   </vue-particles>  

        <Header />

                
        <div class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="breadcrumb-wrap text-center">
                            <div class="section-title">
                                <span class="water-text">Talk to me</span>
                                <h1 class="title">Talk to me</h1>
                            </div>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <router-link to="/">Home</router-link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Contact
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="google-map section-padding pb-0">
            <div class="container">
                <GoogleMap />
            </div>
        </div>
        

        <ContactUs />

        <OffCanvasMobileMenu />

        <Footer />

        <BackToTop />

                    </div>
    </div>
</template>

<style lang="scss" scoped>
#particles-js { 
  position: absolute;
  height: inherit;
  width: inherit;
  top: 20px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0; 
}
.about_me {
  position: relative;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  
  height: 100%;
  justify-content: center;
}
</style>

<script>
    import Header from '@/components/Header';
    import GoogleMap from '@/components/GoogleMap';
    import ContactUs from '@/components/ContactUs';
    import OffCanvasMobileMenu from '@/components/OffCanvasMobileMenu';
    import Footer from '@/components/Footer';
    import BackToTop from '@/components/BackToTop';
    
    export default {
        components: {
            Header,
            GoogleMap,
            ContactUs,
            OffCanvasMobileMenu,
            Footer,
            BackToTop
        },
        metaInfo: {
            title: 'Contact Me',
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        }
    }
</script>
