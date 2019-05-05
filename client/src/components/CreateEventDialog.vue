<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateEventDialog"
    :show-close="false"
    title="Create event"
    width="48rem"
  >
    <el-form ref="eventForm" :rules="requiredRules" :model="tripEvent" class="create-event-form" label-width="8rem">
      <el-form-item label="Category">
        <CategoryRadioButton v-model="tripEvent.category_id" />
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input v-model="tripEvent.title"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Start time">
            <el-date-picker
              v-model="tripEvent.start_time"
              style="width: 100%"
              type="datetime"
              placeholder="Pick a time"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="End time">
            <el-date-picker
              v-model="tripEvent.end_time"
              style="width: 100%"
              type="datetime"
              placeholder="Pick a time"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Timezone">
        <el-select v-model="tripEvent.timezone_id" filterable placeholder="TEST" style="width: 100%">
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
import Vue from 'vue';
import Component from 'vue-class-component';
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

  requiredRules = {
    title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
  };

  tripEvent = {
    user_id: 0,
    trip_day_id: 0,
    timezone_id: 0,
    category_id: 1,
    title: '',
  };

  closeDialog() {
    this.$store.dispatch('openCreateEventDialog', false);
  }

  createTripEvent() {
    let eventForm: any = this.$refs.eventForm;
    eventForm.validate((valid: boolean) => {
      if (valid) {
        this.tripEvent.user_id = this.$store.state.authentication.user.id;
        this.tripEvent.timezone_id = this.$store.state.trip.tripDetail.timezone_id;
        this.tripEvent.trip_day_id = this.$store.state.trip.tripDayDetail.id;
        this.$store.dispatch('openCreateEventDialog', false);
        this.$store.dispatch('trip/createTripEvent', this.tripEvent);
        eventForm.resetFields();
      } else {
        return false;
      }
    });
  }
}
</script>

<style scoped></style>
