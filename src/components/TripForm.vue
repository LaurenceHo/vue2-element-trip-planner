<template>
  <el-dialog
    :visible.sync="$store.state.dashboard.openTripForm"
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
        <el-col :span="12">
          <el-form-item label="Start date" prop="start_date_object">
            <el-date-picker
              :picker-options="{ disabledDate: disabledStartDate }"
              v-model="trip.start_date_object"
              style="width: 100%"
              type="date"
              placeholder="Start date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="End date" prop="end_date_object">
            <el-date-picker
              :picker-options="{ disabledDate: disabledEndDate }"
              v-model="trip.end_date_object"
              style="width: 100%;"
              type="date"
              placeholder="End date"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Timezone" prop="timezone_id">
        <el-select v-model="trip.timezone_id" filterable style="width: 100%">
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
import { Trip } from '../models/trip';

@Component
export default class TripForm extends Vue {
  timezoneList: any = timezone;

  requiredRules = {
    destination: [{ required: true, message: Messages.destination.required, trigger: 'blur' }],
    start_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
    end_date_object: [{ type: 'date', required: true, message: Messages.date.required, trigger: 'change' }],
  };

  trip: Trip = {
    timezone_id: 99,
    start_date_object: new Date(),
    end_date_object: new Date(),
    name: '',
    destination: '',
    archived: false,
  };

  @Watch('edit', { immediate: true, deep: true })
  onEditModeChanged(val: any) {
    if (val.isEditMode && val.component === 'trip') {
      this.trip = {
        id: this.tripDetail.id,
        timezone_id: this.tripDetail.timezone_id,
        start_date_object: new Date(this.tripDetail.start_date),
        end_date_object: new Date(this.tripDetail.end_date),
        name: this.tripDetail.name,
        destination: this.tripDetail.destination,
        archived: this.tripDetail.archived,
      };
    }
  }

  get edit() {
    return this.$store.state.dashboard.edit;
  }

  get tripDetail(): Trip {
    return this.$store.state.trip.tripDetail;
  }

  disabledStartDate(date: Date): boolean {
    if (this.trip.end_date_object) {
      return date > this.trip.end_date_object;
    }
  }

  disabledEndDate(date: Date): boolean {
    if (this.trip.start_date_object) {
      return date < this.trip.start_date_object;
    }
  }

  closeDialog(): void {
    this.$store.dispatch(Actions.OPEN_TRIP_FORM, false);
    if (this.edit.isEditMode) {
      this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
    }
    this.resetForm();
  }

  createTrip() {
    const tripForm: any = this.$refs.tripForm;
    tripForm.validate((valid: boolean) => {
      if (valid) {
        if (!this.edit.isEditMode) {
          this.$store.dispatch(Actions.CREATE_TRIP, this.trip);
        } else {
          this.$store.dispatch(Actions.UPDATE_TRIP, this.trip);
          this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: false, idInEdit: 0, component: null });
        }
        this.$store.dispatch(Actions.OPEN_TRIP_FORM, false);
        tripForm.resetFields();
      } else {
        return false;
      }
    });
  }

  resetForm(): void {
    const tripForm: any = this.$refs.tripForm;
    tripForm.resetFields();

    this.trip = {
      timezone_id: 99,
      start_date_object: new Date(),
      end_date_object: new Date(),
      name: '',
      destination: '',
      archived: false,
    };
  }
}
</script>

<style scoped></style>
