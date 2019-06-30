<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="23" :xl="21" class="trip-event-list-outer">
        <trip-detail-banner />
      </el-col>
    </el-row>
    <el-row style="padding-top: 1rem">
      <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="3">
        <trip-day-list />
      </el-col>
      <el-col :xs="18" :sm="18" :md="19" :lg="19" :xl="18" class="trip-event-list-outer">
        <trip-event-list />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { isEmpty } from 'lodash';

import TripDayList from '../components/TripDayList.vue';
import TripEventList from '../components/TripEventList.vue';
import TripDetailBanner from '../components/TripDetailBanner.vue';
import { Actions } from '../constants/actions';

@Component({
  components: { TripDetailBanner, TripDayList, TripEventList },
})
export default class TripDetailDashboard extends Vue {
  mounted() {
    if (isEmpty(this.$store.state.trip.tripList)) {
      this.$store.dispatch(Actions.GET_TRIP_LIST);
    }
    this.$store.dispatch(Actions.GET_TRIP_DETAIL, { tripId: this.$route.params.trip_id, isCreateOrUpdate: false });
  }
}
</script>

<style scoped>
.trip-event-list-outer {
  padding-right: 1rem;
}
</style>
