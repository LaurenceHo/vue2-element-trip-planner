<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateTripDialog"
    :show-close="false"
    custom-class="create-trip-dialog"
    title="Create trip"
    width="40rem"
  >
    <el-form ref="tripForm" :rules="requiredRules" :model="trip" class="create-trip-form" label-width="6rem">
      <el-form-item label="Name">
        <el-input v-model="trip.name" />
      </el-form-item>
      <el-form-item label="Destination" prop="destination">
        <el-input v-model="trip.destination" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Start date" prop="start_date">
            <el-date-picker v-model="trip.start_date" style="width: 100%" type="date" placeholder="Pick a day" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="End date" prop="end_date">
            <el-date-picker v-model="trip.end_date" style="width: 100%;" type="date" placeholder="Pick a day" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Timezone" prop="timezone_id">
        <el-select v-model="trip.timezone_id" filterable placeholder="please select timezone" style="width: 100%">
          <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isEditMode" label="Archived" prop="archived">
        <el-switch v-model="trip.archived" active-text="Yes" inactive-text="No" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTrip" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
// import * as moment from 'moment';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { timezone } from '../assets/timezone';

@Component
export default class CreateTripDialog extends Vue {
  timezoneList: any = timezone;

  requiredRules = {
    destination: [{ required: true, message: 'Please input destination', trigger: 'blur' }],
    // start_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
    // end_date: [{ type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }],
    // timezone_id: [{ required: true, message: 'Please select timezone', trigger: 'change' }],
  };

  trip = {
    id: 0,
    user_id: 0,
    timezone_id: '',
    start_date: '',
    end_date: '',
    name: '',
    destination: '',
    archived: false,
  };

  @Watch('isEditMode', { immediate: true, deep: true })
  onEditModeChanged1(val: boolean) {
    if (val === true) {
      this.trip = {
        id: this.tripDetail.id,
        user_id: 0,
        timezone_id: this.tripDetail.timezone_id,
        start_date: this.tripDetail.start_date,
        end_date: this.tripDetail.end_date,
        name: this.tripDetail.name,
        destination: this.tripDetail.destination,
        archived: this.tripDetail.archived,
      };
    }
  }

  get isEditMode() {
    return this.$store.state.isEditMode;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  closeDialog() {
    this.$store.dispatch('openCreateTripDialog', false);
    this.$store.dispatch('isEditMode', false);
    let tripForm: any = this.$refs.tripForm;
    tripForm.resetFields();
  }

  createTrip() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.trip.user_id = this.$store.state.authentication.user.id;
        this.$store.dispatch('openCreateTripDialog', false);
        tripForm.resetFields();
        if (!this.isEditMode) {
          this.$store.dispatch('trip/createTrip', this.trip);
        } else {
          this.$store.dispatch('trip/updateTrip', this.trip);
        }
      } else {
        return false;
      }
    });
  }
}
</script>

<style scoped></style>
