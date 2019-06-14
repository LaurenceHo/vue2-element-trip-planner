<template>
  <div>
    <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" :closable="true" show-icon />
    <div v-else>
      <div v-if="isLoading" class="loading-spinner-outer">
        <i class="el-icon-loading loading-spinner" />
        Loading...
      </div>
      <div v-else>
        <div v-if="tripDayDetail">
          <el-row>
            <el-col :xs="18" :sm="18" :md="19" :lg="21" :xl="21">
              <div class="trip-date-text"><font-awesome-icon icon="calendar-alt" /> {{ tripDayDetail.trip_date }}</div>
              <div class="trip-date-name">
                {{ tripDayDetail.name }}
              </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="5" :lg="3" :xl="3">
              <el-button @click="openCreateDialog" class="create-button" type="primary">
                <font-awesome-icon icon="plus" />
                New Event
              </el-button>
            </el-col>
          </el-row>
          <div v-for="e in tripDayDetail.events">
            <event :event="e" />
          </div>
          <create-event-dialog />
        </div>
        <div v-else>
          <el-alert title="You don't have trip detail. Please create trip day at first" type="info" show-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import CreateEventDialog from './CreateEventDialog.vue';
import Event from './Event.vue';
import { TripDay } from '../models/trip-day';

@Component({
  components: { CreateEventDialog, Event },
})
export default class TripItinerary extends Vue {
  get alert() {
    return this.$store.state.alert;
  }

  get isLoading() {
    return this.$store.state.trip.isLoading;
  }

  get selectedTripDayId() {
    return this.$store.state.dashboard.selectedTripDayId;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  get tripDayDetail() {
    if (!isEmpty(this.tripDetail.trip_day)) {
      return this.tripDetail.trip_day.find((tripDay: TripDay) => tripDay.id === this.selectedTripDayId);
    }
  }

  openCreateDialog() {
    this.$store.dispatch('openCreateEventDialog', true);
  }
}
</script>

<style scoped>
.trip-date-text {
  line-height: 1.8rem;
  font-weight: 500;
}
.trip-date-name {
  line-height: 1.8rem;
}
</style>
