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
          <el-row class="trip-date-banner">
            <el-col :xs="18" :sm="18" :md="19" :lg="21" :xl="21">
              <div class="trip-date-text">
                <font-awesome-icon icon="calendar-alt" />
                {{ tripDayDetail.trip_date }}
              </div>
              <div class="trip-date-name">
                {{ tripDayDetail.name }}
              </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="5" :lg="3" :xl="3">
              <el-button @click="openTripEventForm" class="create-button" type="primary">
                <font-awesome-icon icon="plus" />
                New Event
              </el-button>
            </el-col>
          </el-row>
          <div v-for="tripEvent in tripDayDetail.events">
            <div class="trip-event-outer">
              <event :tripEvent="tripEvent" />
            </div>
          </div>
        </div>
        <div v-else>
          <el-alert :title="createTripDayMessage" type="info" show-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

import Event from './Event.vue';
import { TripDay } from '../models/trip-day';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';

@Component({
  components: { Event },
})
export default class TripEventList extends Vue {
  createTripDayMessage = Messages.createTripDay.message;

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

  openTripEventForm() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
  }
}
</script>

<style scoped>
.trip-date-banner {
  padding-bottom: 0.5rem;
}

.trip-date-text {
  line-height: 1.8rem;
  font-weight: 500;
}

.trip-date-name {
  line-height: 1.8rem;
}

.trip-event-outer {
  padding-bottom: 0.5rem;
}
</style>