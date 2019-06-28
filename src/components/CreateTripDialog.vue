<template>
  <el-dialog
    :visible.sync="this.$store.state.dashboard.openTripForm"
    :show-close="false"
    :title="edit.isEditMode ? 'Edit trip' : 'Create trip'"
    custom-class="create-trip-dialog"
    width="40rem"
  >
    <el-form ref="tripForm" :rules="requiredRules" :model="trip" class="create-trip-form" label-width="7rem">
      <el-form-item label="Name">
        <el-input v-model="trip.name" />
      </el-form-item>
      <el-form-item label="Destination" prop="destination">
        <el-input v-model="trip.destination" />
      </el-form-item>
      <el-row>
        <el-form-item label="Trip date" prop="trip_date">
          <el-date-picker
            v-model="trip_date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            style="width: 100%"
          />
        </el-form-item>
      </el-row>
      <el-form-item label="Timezone" prop="timezone_id">
        <el-select v-model="trip.timezone_id" filterable placeholder="please select timezone" style="width: 100%">
          <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="edit.isEditMode" label="Archived" prop="archived">
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { timezone } from '../assets/timezone';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';

@Component
export default class CreateTripDialog extends Vue {
  timezoneList: any = timezone;

  requiredRules = {
    destination: [{ required: true, message: Messages.destination.required, trigger: 'blur' }],
    // FIXME
    // timezone_id: [{ required: true, message: 'Please select timezone', trigger: 'blur' }],
    // trip_date: [{ required: true, message: 'Please pick a date', trigger: 'blur' }],
  };

  trip_date: string[] = [];
  trip = {
    id: 0,
    timezone_id: 99,
    start_date: '',
    end_date: '',
    name: '',
    destination: '',
    archived: false,
  };

  @Watch('edit', { immediate: true, deep: true })
  onEditModeChanged(val: any) {
    if (val.isEditMode && val.component === 'trip') {
      this.trip_date = [this.tripDetail.start_date, this.tripDetail.end_date];
      Object.keys(this.tripDetail).forEach(prop => {
        this.trip[prop] = this.tripDetail[prop];
      });
    }
  }

  get edit() {
    return this.$store.state.dashboard.edit;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  closeDialog() {
    this.$store.dispatch(Actions.OPEN_TRIP_FORM, false);
    this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
    this.resetForm();
  }

  createTrip() {
    let tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        this.trip.start_date = this.trip_date[0];
        this.trip.end_date = this.trip_date[1];
        if (!this.edit.isEditMode) {
          this.$store.dispatch(Actions.CREATE_TRIP, this.trip);
        } else {
          this.$store.dispatch(Actions.UPDATE_TRIP, this.trip);
        }
        this.$store.dispatch(Actions.OPEN_TRIP_FORM, false);
        this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
        this.resetForm();
      } else {
        return false;
      }
    });
  }

  resetForm() {
    this.trip = {
      id: 0,
      timezone_id: 99,
      start_date: '',
      end_date: '',
      name: '',
      destination: '',
      archived: false,
    };
  }
}
</script>

<style scoped></style>
