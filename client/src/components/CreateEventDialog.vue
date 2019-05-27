<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateEventDialog"
    :show-close="false"
    :title="edit.isEditMode ? 'Edit event' : 'Create event'"
    width="48rem"
  >
    <el-form ref="eventForm" :rules="requiredRules" :model="tripEvent" class="create-event-form" label-width="8rem">
      <el-form-item label="Category">
        <CategoryRadioButton v-model="tripEvent.category_id" />
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input v-model="tripEvent.title" />
      </el-form-item>
      <el-row>
        <el-form-item label="Event time" prop="trip_date">
          <el-date-picker
            v-model="event_time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
            style="width: 100%"
          />
        </el-form-item>
      </el-row>
      <el-form-item label="Timezone">
        <el-select v-model="tripEvent.timezone_id" filterable placeholder="please select timezone" style="width: 100%">
          <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Cost">
            <el-input v-model="tripEvent.cost" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Currency">
            <el-select
              v-model="tripEvent.currency_id"
              filterable
              placeholder="please select currency"
              style="width: 100%"
            >
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button @click="createTripEvent" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { Vue, Component, Watch } from 'vue-property-decorator';
import CategoryRadioButton from './CategoryRadioButton.vue';
import { currency } from '../assets/currency';
import { timezone } from '../assets/timezone';

@Component({
  components: { CategoryRadioButton },
})
export default class CreateEventDialog extends Vue {
  currencyList: any = currency;
  timezoneList: any = timezone;
  currentTimezone = this.timezoneList.find((tz: any) => tz.id === this.$store.state.trip.tripDetail.timezone_id);

  event_time: string[] = [];
  requiredRules = {
    title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
  };

  tripEvent = {
    id: 0,
    user_id: this.$store.state.authentication.user.id,
    trip_day_id: this.$store.state.trip.tripDayDetail.id,
    timezone_id: this.$store.state.trip.tripDetail.timezone_id,
    category_id: 1,
    currency_id: '',
    title: '',
    start_time: '',
    end_time: '',
    start_location: '',
    end_location: '',
    note: '',
    tag: '',
    cost: '',
  };

  @Watch('edit', { immediate: true, deep: true })
  onEditModeChanged(val: any) {
    if (val.isEditMode === true) {
      this.event_time = [this.tripEvent.start_time, this.tripEvent.end_time];
      this.tripEvent = {
        id: this.tripEventDetail.id,
        user_id: this.$store.state.authentication.user.id,
        trip_day_id: this.tripEventDetail.trip_day_id,
        timezone_id: this.tripEventDetail.timezone_id,
        category_id: this.tripEventDetail.category_id,
        currency_id: this.tripEventDetail.currency_id,
        start_time: this.tripEventDetail.start_time,
        end_time: this.tripEventDetail.end_time,
        title: this.tripEventDetail.title,
        start_location: this.tripEventDetail.start_location,
        end_location: this.tripEventDetail.end_location,
        note: this.tripEventDetail.note,
        tag: this.tripEventDetail.tag,
        cost: this.tripEventDetail.cost,
      };
    }
  }

  get edit() {
    return this.$store.state.edit;
  }

  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  get tripDayDetail() {
    return this.$store.state.trip.tripDayDetail;
  }

  get tripEventDetail() {
    if (!isEmpty(this.tripDayDetail.events) && this.edit.isEditMode) {
      return this.tripDayDetail.events.find((e: any) => e.id === this.edit.idInEdit);
    } else {
      return {};
    }
  }

  closeDialog() {
    this.$store.dispatch('openCreateEventDialog', false);
    this.$store.dispatch('edit', { isEditMode: false, idInEdit: 0, component: '' });
    this.resetForm();
  }

  createTripEvent() {
    let eventForm: any = this.$refs.eventForm;
    eventForm.validate((valid: boolean) => {
      if (valid) {
        this.tripEvent.start_time = this.event_time[0];
        this.tripEvent.end_time = this.event_time[1];
        if (isEmpty(this.tripEvent.timezone_id)) {
          this.tripEvent.timezone_id = this.tripDetail.timezone_id;
        }
        console.log(this.tripEvent);
        if (!this.edit.isEditMode) {
          this.$store.dispatch('trip/createTripEvent', this.tripEvent);
        } else {
          this.$store.dispatch('trip/updateTripEvent', this.tripEvent);
        }
        this.$store.dispatch('openCreateEventDialog', false);
        this.$store.dispatch('edit', { isEditMode: false, idInEdit: 0, component: '' });
        this.resetForm();
      } else {
        return false;
      }
    });
  }

  resetForm() {
    this.tripEvent = {
      id: 0,
      user_id: this.$store.state.authentication.user.id,
      trip_day_id: this.$store.state.trip.tripDayDetail.id,
      timezone_id: this.$store.state.trip.tripDetail.timezone_id,
      category_id: 1,
      currency_id: '',
      title: '',
      start_time: '',
      end_time: '',
      start_location: '',
      end_location: '',
      note: '',
      tag: '',
      cost: '',
    };
  }
}
</script>

<style scoped></style>
