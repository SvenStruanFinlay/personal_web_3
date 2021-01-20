<template>
  <section class="about-us-area section-padding bg-color-light">
    <div class="about_me">
                  <vue-particles
        class="particle"
        color="#a7a7a7"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="circle"
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
        clickMode="push"
      >   </vue-particles>  
  
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title text-center">
              <span class="water-text">{{
                data.about.sectionTitleWaterText
              }}</span>
              <h2 class="title">{{ data.about.sectionTitle }}</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="about-us">
              <div class="about-us__content text-center">
                <div class="aboutPara">
                  <p>{{ data.about.aboutMe }}</p>
                </div>

                <div class="aboutPara">
                  <p>{{ data.about.aboutMe2 }}</p>
                </div>

                <div class="aboutPara">
                  <p>{{ data.about.aboutMe3 }}</p>
                </div>
                <div class="signature">
                  <img src="/img/bg/signature.png" alt="Sven Finlay Sig" />
                </div>
                <div class="social-link">
                  <a
                    :href="social.link"
                    target="_blank"
                    v-for="social in data.socials"
                    :key="social.id"
                  >
                    <i :class="social.icon"></i>
                  </a>
                </div>
                <a href="/img/CV_SVEN_FINLAY.pdf" class="download-btn" download
                  >Download <span>Resume</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  </section>
</template>

<script>
import data from "../data/about.json";
export default {
  data() {
    return {
      data,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

// .about_me {
//   position: absolute;
//   margin: 0;
// }

.about_me {
  position: relative;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  
  height: 100%;
  justify-content: center;
}
#particles-js { 
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0; 
}
.about-us {
  &__content {
    padding: 0 40px;
    // res
    @media #{$sm-device} {
      padding: 0;
    }
    p {
      color: #bbb;
      font-size: 16px;
    }
    .aboutPara {
      margin-bottom: 2%;
    }
    .signature {
      max-width: 170px;
      margin: 30px auto 0;
    }
    .social-link {
      margin-top: 20px;
      display: inline-block;
      position: relative;
      padding: 0 30px;
      &:before,
      &:after {
        top: 50%;
        left: -50px;
        width: 60px;
        height: 1px;
        content: "";
        position: absolute;
        background-color: $theme-color-secondary;
        transform: translateY(-50%);
      }
      &:after {
        left: auto;
        right: -50px;
      }
      a {
        font-size: 20px;
        color: $theme-color-secondary;
        margin-right: 20px;
        &:hover {
          color: $theme-color-primary;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .download-btn {
      display: block;
      font-size: 18px;
      margin: auto;
      margin-top: 15px;
      line-height: 1;
      color: $theme-color-secondary;
      span {
        color: $theme-color-primary;
        text-decoration: underline;
      }
    }
  }
}
</style>