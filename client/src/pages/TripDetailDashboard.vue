<template>
  <div>
    <el-row>
      <trip-banner />
    </el-row>
    <div style="padding-top: 1rem">
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
          <trip-day />
        </el-col>
        <el-col :xs="18" :sm="17" :md="17" :lg="16" :xl="16">
          <trip-event />
        </el-col>
      </el-row>
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
