<template>
  <div>
    <trip-banner />
    <div style="padding-top: 1rem">
      <el-col :span="5">
        <trip-day />
      </el-col>
      <el-col :span="19">
        <trip-event />
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TripDay from '../components/TripDay.vue';
import TripEvent from '../components/TripEvent.vue';
import TripBanner from '../components/TripBanner.vue';

@Component({
  components: { TripBanner, TripDay, TripEvent },
})
export default class TripDetailDashboard extends Vue {
  beforeMount() {
    if (this.$store.state.trip.tripDetail.id === 0) {
      this.$store.dispatch('trip/getTripDetailWithDays', this.$route.params.trip_id);
    }
  }
}
</script>

<style scoped></style>
