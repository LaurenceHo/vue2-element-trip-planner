<template>
  <div>
    <trip-banner/>
    <el-col :span="5">
      <trip-day/>
    </el-col>
    <el-col :span="19">
      <trip-event/>
    </el-col>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TripDay from '../components/TripDay.vue';
  import TripEvent from '../components/TripEvent.vue';
  import TripBanner from '../components/TripBanner.vue';

  @Component({
    components: {TripBanner, TripDay, TripEvent}
  })
  export default class TripDetailDashboard extends Vue {
    beforeMount() {
      this.$store.dispatch('trip/getTripDays', {trip_id: this.$route.params.trip_id, isInitial: true});
    }
  }
</script>

<style scoped>
</style>
