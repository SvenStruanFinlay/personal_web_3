<template>
  <section class="about-us-area section-padding bg-color-light">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title text-center">
            <span class="water-text">{{
              data.skills.sectionTitleWaterText
            }}</span>
            <h2 class="title">{{ data.skills.sectionTitle }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="about-us">
            <div class="about-us__content text-center">
              <div class="aboutPara">
                <p>{{ data.skills.aboutMe }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="about-us">
            <div class="about-us__content text-center">
              <div class="aboutPara">
                <h2>Languages</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row align-items-center">
            <swiper :options="swiperOption1">
              <div
                class="swiper-slide"
                v-for="skill in data.languageList"
                :key="skill.id"
              >
                <div class="screenshot-image">
                  <div class="box">
                    <round-slider
                      v-model="skill.level"
                      start-angle="315"
                      end-angle="+270"
                      line-cap="round"
                      radius="80"
                      max="5"
                      circleShape="full"
                      readOnly="True"
                      handleSize="+0"
                      pathColor="inherit"
                      rangeColor="#FFF"
                      showTooltip="True"
                      tooltip="skill.tooltip"
                    />
                    <h2>{{ skill.id }}</h2>
                  </div>
                </div>
              </div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="about-us">
            <div class="about-us__content text-center">
              <div class="aboutPara">
                <h2>Frameworks</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row align-items-center">
            <swiper :options="swiperOption2">
              <div
                class="swiper-slide"
                v-for="skill in data.OtherSkillList"
                :key="skill.id"
              >
                <div class="screenshot-image">
                  <div class="box">
                    <div class="circle">{{ skill.id }}</div>
                  </div>
                </div>
              </div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from "../data/skills.json";
import RoundSlider from "vue-round-slider";
export default {
  components: {
    RoundSlider,
  },

  data() {
    return {
      swiperOption1: {
        slidesPerView: 6,
        loop: true,
        speed: 2000,
        autoplay: {
          enabled: true,
          delay: 4,
        },
        reverse: true,
        spaceBetween: 30,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          // Responsive breakpoints
        },
      },
      swiperOption2: {
        slidesPerView: 6,
        slidesPerGroup: 2,
        loop: true,
        speed: 2000,
        autoplay: {
          enabled: true,
          delay: 2,
        },
        reverse: true,
        spaceBetween: 30, 
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          // Responsive breakpoints
        },
        // Responsive breakpoints
      },
      data,
    };
  },
};
</script>

<style lang="scss">
.box {
  padding: 10px;
  text-align: center;
  display: inline-block;
}

// .circle {
//     border: 2px solid white;
//     background-color:inherit;
//     height: 160px;
//     border-radius:50%;
//     width: 160px;
// }

.h2 {
  text-align: center;
}

.row {
  position: relative;
}
.circle {
  width: 160px;
  height: 160px;
  line-height: 160px;
  border-radius: 50%;

  border: 3px solid white;
  font-size: 25px;
  color: #fff;
  text-align: center;
  background: rgba(33, 23, 58, 0.308);
}
</style>