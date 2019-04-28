<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateTripDayDialog"
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
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})
export default class CreateTripDayDialog extends Vue {
  requiredRules = {
    trip_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
  };

  tripDay = {
    user_id: this.$store.state.authentication.user.id,
    trip_id: this.$store.state.trip.tripDetail.id,
    trip_date: '',
    name: '',
  };

  closeDialog() {
    this.$store.dispatch('openCreateTripDayDialog', false);
  }

  createTripDay() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('openCreateTripDayDialog', false);
        this.$store.dispatch('trip/createTripDay', this.tripDay);
        tripForm.resetFields();
      } else {
        return false;
      }
    });
  }
}
</script>

<style scoped></style>
