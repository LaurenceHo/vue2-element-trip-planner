<template>
  <el-dialog
    :visible.sync="$store.state.dashboard.openTripDayForm"
    :show-close="false"
    custom-class="create-trip-day-dialog"
    title="Create trip day"
    width="35rem"
  >
    <el-form ref="tripForm" :rules="requiredRules" :model="tripDay" class="create-trip-day-form" label-width="6rem">
      <el-form-item label="Name">
        <el-input v-model="tripDay.name" />
      </el-form-item>
      <el-form-item label="Trip date" prop="trip_date">
        <el-date-picker v-model="tripDay.trip_date" type="date" placeholder="Pick a day" style="width: 100%" />
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
import { Actions } from '../constants/actions';

@Component
export default class TripDayForm extends Vue {
  requiredRules = {
    trip_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
  };

  tripDay = {
    trip_id: 0,
    trip_date: '',
    name: '',
  };

  closeDialog() {
    this.$store.dispatch(Actions.OPEN_TRIP_DAY_FORM, false);
    this.resetForm();
  }

  createTripDay() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.tripDay.trip_id = this.$store.state.trip.tripDetail.id;
        this.$store.dispatch(Actions.OPEN_TRIP_DAY_FORM, false);
        this.$store.dispatch(Actions.CREATE_TRIP_DAY, this.tripDay);
        this.resetForm();
      } else {
        return false;
      }
    });
  }

  resetForm() {
    this.tripDay = {
      trip_id: 0,
      trip_date: '',
      name: '',
    };
  }
}
</script>

<style scoped></style>
