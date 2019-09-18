<template>
  <div>
    <el-row>
      <el-col :lg="23" :md="24" :sm="24" :xl="21" :xs="24" class="trip-event-list-outer">
        <trip-detail-banner />
      </el-col>
    </el-row>
    <el-row style="padding-top: 1rem">
      <el-col :lg="4" :md="5" :sm="6" :xl="3" :xs="6" style="padding-right: 0.2rem">
        <trip-day-list />
      </el-col>
      <el-col :lg="19" :md="19" :sm="18" :xl="18" :xs="18" class="trip-event-list-outer">
        <trip-event-list />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { isEmpty } from 'lodash';
import TripDayList from '@/components/TripDayList.vue';
import TripEventList from '@/components/TripEventList.vue';
import TripDetailBanner from '@/components/TripDetailBanner.vue';
import { Actions } from '@/constants/actions';

@Component({
  components: { TripDetailBanner, TripDayList, TripEventList },
})
export default class TripDetailDashboard extends Vue {
  mounted() {
    if (isEmpty(this.$store.state.trip.tripList)) {
      this.$store.dispatch(Actions.GET_TRIP_LIST);
    }
    this.$store.dispatch(Actions.GET_TRIP_DETAIL, this.$route.params.trip_id);
  }
}
</script>

<style scoped>
.trip-event-list-outer {
  padding-right: 1rem;
}
</style>
