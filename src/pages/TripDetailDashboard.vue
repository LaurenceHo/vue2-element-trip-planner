<template>
  <div>
    <el-row>
      <trip-detail-banner />
    </el-row>
    <div style="padding-top: 1rem">
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
          <trip-day-list />
        </el-col>
        <el-col :xs="18" :sm="17" :md="17" :lg="16" :xl="16">
          <trip-itinerary />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TripDayList from '../components/TripDayList.vue';
import TripEventList from '../components/TripEventList.vue';
import TripDetailBanner from '../components/TripDetailBanner.vue';
import { Actions } from '../constants/actions';

@Component({
  components: { TripDetailBanner, TripDayList, TripItinerary: TripEventList },
})
export default class TripDetailDashboard extends Vue {
  beforeMount() {
    if (this.$store.state.trip.tripDetail.id === 0) {
      this.$store.dispatch(Actions.GET_TRIP_DETAIL, this.$route.params.trip_id);
    }
  }
}
</script>

<style scoped></style>
