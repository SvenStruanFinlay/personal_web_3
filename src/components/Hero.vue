<template>
  
  <div class="hero hero__banner bg-color-dark">
       
    <div class="container custom-container">
        
      <div class="row align-items-center">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="hero__content">
            <h5 class="hero__content--subtitle" v-html="data.hero.subTitle">
              {{ data.hero.subTitle }}
            </h5>
            <h1 class="hero__content--title">
              {{ data.hero.title }}
            </h1>
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="hero__thumb">
            <div class="hero__thumb--one">
              <v-lazy-image
                :src="data.hero.bgImg"
                class="img-fluid rotateWorld"
                alt="Sven Struan Finlay"
              />
            </div>
            <div class="hero__thumb--two">
              <v-lazy-image
                :src="data.hero.image"
                class="img-fluid"
                alt="Sven Struan Finlay"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import data from "../data/hero.json";
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

.hero {
  &__content {
    color: $theme-color-primary;
    max-width: 570px;
    float: right;
    // res
    @media #{$md-device} {
      max-width: 330px;
      padding-top: 75px;
    }
    @media #{$sm-device} {
      max-width: 472px;
      margin: auto;
      float: none;
      text-align: center;
      padding-top: 130px;
    }

    &--subtitle {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 30px;
      font-family: $heading-font;
      span {
        color: $white;
      }
      // res
      @media #{$sm-device} {
        margin-bottom: 15px;
      }
    }
    &--title {
      font-size: 48px;
      font-weight: 700;
      font-family: $heading-font;
      // res
      @media #{$md-device, $sm-device} {
        font-size: 36px;
      }
      @media #{$xs-device} {
        font-size: 30px;
      }
    }
  }
  &__thumb {
    margin-top: 100px;
    // res
    @media #{$sm-device} {
      margin-top: 30px;
    }
    &--one {
      position: absolute;
      top: 100px;
      right: 100px;
      // res
      @media #{$sm-device} {
        top: 0;
        right: 0;
      }
    }
    &--two {
      position: relative;
    }
  }
}
</style>