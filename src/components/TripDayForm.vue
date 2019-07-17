<template>
  <el-dialog
    :visible.sync="$store.state.dashboard.openTripDayForm"
    :show-close="false"
    custom-class="create-trip-day-dialog"
    title="Create trip day"
    width="35rem"
  >
    <el-form ref="tripForm" :rules="requiredRules" :model="tripDay" label-width="6rem">
      <el-form-item label="Name">
        <el-input v-model="tripDay.name" />
      </el-form-item>
      <el-form-item label="Trip date" prop="trip_date_object">
        <el-date-picker
          :picker-options="{ disabledDate }"
          v-model="tripDay.trip_date_object"
          type="date"
          placeholder="Pick a day"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTripDay" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as moment from 'moment';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';
import { TripDay } from '../models/trip-day';

@Component
export default class TripDayForm extends Vue {
  requiredRules = {
    trip_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
  };

  tripDay: TripDay = {
    trip_id: 0,
    trip_date: '',
    trip_date_object: this.tripDetail.start_date ? new Date(this.tripDetail.start_date) : null,
    name: '',
  };

  get edit() {
    return this.$store.state.dashboard.edit;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  disabledDate(date: Date) {
    const startDate = moment(this.tripDetail.start_date);
    const endDate = moment(this.tripDetail.end_date);
    return moment(date) > endDate || moment(date) < startDate;
  }

  closeDialog() {
    this.$store.dispatch(Actions.OPEN_TRIP_DAY_FORM, false);
    this.resetForm();
  }

  createTripDay() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.tripDay.trip_id = this.$store.state.trip.tripDetail.id;
        this.$store.dispatch(Actions.CREATE_TRIP_DAY, this.tripDay);
        this.$store.dispatch(Actions.OPEN_TRIP_DAY_FORM, false);
        this.resetForm();
      } else {
        return false;
      }
    });
  }

  resetForm() {
    const tripForm: any = this.$refs.tripForm;
    tripForm.resetFields();

    this.tripDay = {
      trip_id: 0,
      trip_date: '',
      trip_date_object: new Date(this.tripDetail.start_date),
      name: '',
    };
  }
}
</script>

<style scoped></style>
