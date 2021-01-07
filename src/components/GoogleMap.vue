<template>
  <div class="google-map-area section" id="support">
    <GmapMap
      :center="{ lat: 51.51916, lng: -0.1396 }"
      :zoom="13"
      map-type-id="terrain"
    >
      <GmapMarker
        ref="myMarker"
        :position="google && new google.maps.LatLng(51.51916, -0.1396)"
      />
    </GmapMap>
  </div>
</template>

<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import {gmapApi} from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC7NLfPsWeU4sBWjzcY9gW3gwryJlHLZck",
    libraries: "places", // This is required if you use the Autocomplete plugin
  },
});
export default {
  name: "GoogleMap",
    computed: {
    google: gmapApi
  }
};
</script>
