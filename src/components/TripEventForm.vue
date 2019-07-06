<template>
  <el-dialog
    :visible.sync="$store.state.dashboard.openTripEventForm"
    :show-close="false"
    :title="edit.isEditMode ? 'Edit event' : 'Create event'"
    width="48rem"
  >
    <el-form ref="eventForm" :rules="requiredRules" :model="tripEvent" class="create-event-form" label-width="8rem">
      <el-form-item label="Category">
        <event-category v-model="tripEvent.category_id" />
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input v-model="tripEvent.title" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Start time" prop="start_time_object">
            <el-date-picker v-model="tripEvent.start_time_object" style="width: 100%" type="date" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Timezone">
            <el-select v-model="tripEvent.start_time_timezone_id" filterable style="width: 100%">
              <el-option :value="0" label="--" />
              <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="End time" prop="end_time_object">
            <el-date-picker v-model="tripEvent.end_time_object" style="width: 100%" type="date" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Timezone">
            <el-select v-model="tripEvent.end_time_timezone_id" filterable style="width: 100%">
              <el-option :value="0" label="--" />
              <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Cost">
            <el-input v-model="tripEvent.cost" type="number" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Currency">
            <el-select v-model="tripEvent.currency_id" filterable style="width: 100%">
              <el-option :value="0" label="--" />
              <el-option v-for="c in currencyList" :label="`${c.name} (${c.code})`" :value="c.id" :key="c.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Start location">
        <el-input v-model="tripEvent.start_location" />
      </el-form-item>
      <el-form-item label="End location">
        <el-input v-model="tripEvent.end_location" />
      </el-form-item>
      <el-form-item label="Note">
        <el-input v-model="tripEvent.note" type="textarea" />
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="tripEvent.tag" placeholder="Use comma to separate tag" />
      </el-form-item>
      <el-form-item v-if="tripEvent.tag" v-for="tag in tripEvent.tag.split(',')">
        <el-tag>{{ tag }}</el-tag>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTripEvent" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { Component, Vue, Watch } from 'vue-property-decorator';

import EventCategory from './EventCategory.vue';
import { currency } from '../assets/currency';
import { timezone } from '../assets/timezone';
import { Event as TripEvent } from '../models/event';
import { TripDay } from '../models/trip-day';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';

@Component({
  components: { EventCategory },
})
export default class TripEventForm extends Vue {
  currencyList: any = currency;
  timezoneList: any = timezone;

  requiredRules = {
    title: [{ required: true, message: Messages.title.required, trigger: 'blur' }],
    start_time_object: [{ type: 'date', message: Messages.date.required, trigger: 'change' }],
    end_time_object: [{ type: 'date', message: Messages.date.required, trigger: 'change' }],
  };

  tripEvent: TripEvent = {
    trip_day_id: this.selectedTripDayId,
    start_time_timezone_id: null,
    end_time_timezone_id: null,
    category_id: 1,
    currency_id: null,
    title: '',
    start_time_object: null,
    end_time_object: null,
    start_location: '',
    end_location: '',
    note: '',
    tag: 'tag1,tag2',
    cost: null,
  };

  @Watch('edit', { immediate: true, deep: true })
  onEditModeChanged(val: any) {
    if (val.isEditMode && val.component === 'tripEvent') {
      Object.keys(this.tripEventDetail).forEach(prop => {
        this.tripEvent[prop] = this.tripEventDetail[prop];
      });
      this.tripEvent.start_time_object = new Date(this.tripEventDetail.start_time);
      this.tripEvent.end_time_object = new Date(this.tripEventDetail.end_time);
    }
  }

  get edit() {
    return this.$store.state.dashboard.edit;
  }

  get selectedTripDayId() {
    return this.$store.state.dashboard.selectedTripDayId;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  get tripEventDetail(): TripEvent {
    if (!isEmpty(this.tripDetail.trip_day)) {
      const tripDay = this.tripDetail.trip_day.find((tripDay: TripDay) => tripDay.id === this.selectedTripDayId);

      if (!isEmpty(tripDay.events) && this.edit.isEditMode) {
        return tripDay.events.find((e: any) => e.id === this.edit.idInEdit);
      } else {
        return null;
      }
    }
  }

  // TODO, need to consider local time
  // disabledStartTime(date: Date): boolean {
  //   if (this.tripEventDetail.end_time_object) {
  //     return date > this.tripEventDetail.end_time_object;
  //   }
  // }
  //
  // disabledEndTime(date: Date): boolean {
  //   if (this.tripEventDetail.start_time_object) {
  //     return date < this.tripDetail.start_time_object;
  //   }
  // }

  closeDialog() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, false);
    this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
    this.resetForm();
  }

  createTripEvent() {
    let eventForm: any = this.$refs.eventForm;
    eventForm.validate((valid: boolean) => {
      if (valid) {
        if (!this.edit.isEditMode) {
          this.tripEvent.trip_day_id = this.selectedTripDayId;
          this.$store.dispatch(Actions.CREATE_TRIP_EVENT, this.tripEvent);
        } else {
          this.$store.dispatch(Actions.UPDATE_TRIP_EVENT, this.tripEvent);
        }
        this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, false);
        this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
        this.resetForm();
      } else {
        return false;
      }
    });
  }

  resetForm() {
    this.tripEvent = {
      trip_day_id: this.selectedTripDayId,
      start_time_timezone_id: null,
      end_time_timezone_id: null,
      category_id: 1,
      currency_id: null,
      title: '',
      start_time_object: null,
      end_time_object: null,
      start_location: '',
      end_location: '',
      note: '',
      tag: '',
      cost: null,
    };
  }
}
</script>

<style scoped></style>
