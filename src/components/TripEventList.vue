<template>
  <div>
    <el-alert
      :title="alert.message"
      :type="alert.type"
      @close="clearAlert"
      effect="dark"
      show-icon
      v-if="alert.message"
    />
    <div>
      <div v-if="isLoading">
        <div class="el-loading-spinner">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" fill="none" r="20"></circle>
          </svg>
        </div>
      </div>
      <div v-else>
        <div v-if="tripDayDetail">
          <div class="trip-day-banner">
            <el-button @click="openTripEventForm" class="create-button" type="primary">
              <font-awesome-icon icon="plus" />
              New Event
            </el-button>
            <div class="trip-day-edit-form" v-if="isEdit">
              <trip-day-inner-form :tripDayDetail="tripDayDetail" @cancel="focusField" />
            </div>
            <div v-else>
              <div @click="focusField" class="trip-day-wrapper">
                <div class="trip-day-date">
                  <font-awesome-icon icon="calendar-alt" />
                  {{ tripDayDetail.trip_date }}
                </div>
                <div class="trip-day-name">
                  {{ tripDayDetail.name }}
                </div>
                <font-awesome-icon class="trip-day-edit-icon" icon="pen" />
              </div>
            </div>
            <div v-if="!tripDayDetail.events || tripDayDetail.events.length === 0">
              <font-awesome-icon @click="isDialogOpen = true" class="trip-day-delete-icon" icon="trash-alt" />
            </div>
          </div>
          <div :key="tripEvent.id" v-for="tripEvent in tripDayDetail.events">
            <event :tripEvent="tripEvent" />
          </div>
        </div>
        <div v-else>
          <el-alert :title="createTripDayMessage" effect="dark" show-icon type="info" />
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isDialogOpen" title="Warning" v-if="isDialogOpen" width="30%">
      <span>
        This will permanently delete the trip day <strong>{{ tripDayDetail.trip_date }} </strong>. Do you want to
        continue?
      </span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="isDialogOpen = false">Cancel</el-button>
        <el-button @click="deleteTripDay" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import Event from '@/components/Event.vue';
import TripDayInnerForm from '@/components/TripDayInnerForm.vue';
import { TripDay } from '@/models/trip-day';
import { Actions } from '@/constants/actions';
import { Messages } from '@/constants/messages';

@Component({
  components: { Event, TripDayInnerForm },
})
export default class TripEventList extends Vue {
  requiredRules = {
    trip_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
  };
  createTripDayMessage = Messages.createTripDay.message;
  isEdit = false;
  isDialogOpen = false;

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

  get tripDayDetail(): TripDay {
    if (!isEmpty(this.tripDetail.trip_day)) {
      let tripDayDetail: TripDay = this.tripDetail.trip_day.find(
        (tripDay: TripDay) => tripDay.id === this.selectedTripDayId
      );
      tripDayDetail.trip_date_object = new Date(tripDayDetail.trip_date);
      return tripDayDetail;
    }
    return null;
  }

  focusField() {
    this.isEdit = !this.isEdit;
  }

  openTripEventForm() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
  }

  clearAlert() {
    this.$store.dispatch(Actions.CLEAR_ALERT);
  }

  deleteTripDay() {
    this.isDialogOpen = false;
    this.$store.dispatch(Actions.DELETE_TRIP_DAY, this.selectedTripDayId);
  }
}
</script>

<style scoped>
.el-loading-spinner {
  margin-top: 3rem;
  width: 100%;
  position: relative;
}

.trip-day-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.5rem;
}

.trip-day-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.5rem;
}

.trip-day-wrapper:hover {
  background-color: lightcyan;
}

.trip-day-date {
  line-height: 1.8rem;
  font-weight: 500;
}

.trip-day-name {
  line-height: 1.8rem;
  padding-left: 0.8rem;
}

.trip-day-edit-icon {
  padding-left: 0.8rem;
  color: lightgray;
}

.trip-day-edit-form {
  padding-left: 1rem;
}

.trip-day-delete-icon {
  color: lightgray;
  cursor: pointer;
}
</style>
