<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateTripDayDialog"
    :show-close="false"
    custom-class="create-trip-day-dialog"
    title="Create trip day"
    width="30rem"
    append-to-body
  >
    <el-form
      ref="tripForm"
      :rules="requiredRules"
      :model="tripDay"
      class="create-trip-day-form"
      label-position="top"
      label-width="3rem"
    >
      <el-form-item label="Name">
        <el-input v-model="tripDay.name" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Trip date" prop="trip_date">
            <el-date-picker v-model="tripDay.trip_date" style="width: 90%;" type="date" placeholder="Pick a day" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTripDay()" type="primary">Confirm</el-button>
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
    trip_id: this.$store.state.trip.tripDetail.id,
    user_id: this.$store.state.authentication.user.id,
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
