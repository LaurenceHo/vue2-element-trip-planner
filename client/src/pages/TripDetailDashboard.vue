<template>
  <div>
    <create-trip-day-dialog />
    <el-row>
      <el-col :span="24">
        <trip-banner />
      </el-col>
    </el-row>
    <div style="padding-top: 1rem">
      <el-row>
        <el-col :span="4">
          <trip-day />
        </el-col>
        <el-col :span="16">
          <trip-event />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CreateTripDayDialog from '../components/CreateTripDayDialog.vue';
import TripDay from '../components/TripDay.vue';
import TripEvent from '../components/TripEvent.vue';
import TripBanner from '../components/TripBanner.vue';

@Component({
  components: { CreateTripDayDialog, TripBanner, TripDay, TripEvent },
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
