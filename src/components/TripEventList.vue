<template>
  <div>
    <el-alert
      v-if="alert.message"
      :title="alert.message"
      :type="alert.type"
      @close="clearAlert"
      show-icon
      effect="dark"
    />
    <div>
      <div v-if="isLoading">
        <div class="el-loading-spinner">
          <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
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
            <div v-if="isEdit" class="trip-day-edit-form">
              <el-form
                ref="tripForm"
                :rules="requiredRules"
                :model="tripDayDetail"
                size="mini"
                label-width="4rem"
                label-position="top"
                width="40rem"
              >
                <el-row align="bottom">
                  <el-col :span="9">
                    <el-form-item label="Trip date" prop="trip_date_object">
                      <el-date-picker
                        :picker-options="{ disabledDate }"
                        v-model="tripDayDetail.trip_date_object"
                        type="date"
                        placeholder="Pick a day"
                        style="width: 90%"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="Name">
                      <el-input v-model="tripDayDetail.name" style="width: 90%" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="padding-top: 2.2rem">
                    <el-button @click="focusField" type="info" size="mini" icon="el-icon-close" circle></el-button>
                    <el-button @click="editTripDay" type="success" size="mini" icon="el-icon-check" circle></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
                  </el-col>
                </el-row>
              </el-form>
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
          </div>
          <div v-for="tripEvent in tripDayDetail.events">
            <event :tripEvent="tripEvent" />
          </div>
        </div>
        <div v-else>
          <el-alert :title="createTripDayMessage" type="info" show-icon effect="dark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as moment from 'moment';
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
  requiredRules = {
    trip_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
  };
  createTripDayMessage = Messages.createTripDay.message;
  isEdit = false;

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
  }

  focusField() {
    this.isEdit = !this.isEdit;
  }

  editTripDay() {
    const tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch(Actions.UPDATE_TRIP_DAY, this.tripDayDetail);
      } else {
        return false;
      }
    });
  }

  disabledDate(date: Date) {
    const startDate = moment(this.tripDetail.start_date);
    const endDate = moment(this.tripDetail.end_date);
    return moment(date) > endDate || moment(date) < startDate;
  }

  openTripEventForm() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
  }

  clearAlert() {
    this.$store.dispatch(Actions.CLEAR_ALERT);
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
</style>
