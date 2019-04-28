<template>
  <el-dialog
    :visible.sync="this.$store.state.openCreateEventDialog"
    :show-close="false"
    title="Create event"
    width="45rem"
    append-to-body
  >
    <el-form ref="eventForm" :rules="requiredRules" :model="tripEvent" class="create-event-form" label-width="6rem">
      <el-form-item label="Category">
        <el-radio-group v-model="tripEvent.category_id" size="small">
          <el-radio-button label="1"><font-awesome-icon icon="walking" /> Activity</el-radio-button>
          <el-radio-button label="2"><font-awesome-icon icon="bus-alt" /> Transportation</el-radio-button>
          <el-radio-button label="3"><font-awesome-icon icon="info-circle" /> Info</el-radio-button>
          <el-radio-button label="4"><font-awesome-icon icon="hotel" /> Accommodation</el-radio-button>
          <el-radio-button label="5"><font-awesome-icon icon="plane" /> Flight</el-radio-button>
          <el-radio-button label="6"><font-awesome-icon icon="ship" /> Cruise</el-radio-button>
        </el-radio-group>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="Timezone">
            <el-select
              v-model="tripEvent.timezone_id"
              filterable
              placeholder="please select timezone"
              style="width: 100%"
            >
              <el-option v-for="tz in timezoneList" :label="tz.text" :value="tz.id" :key="tz.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
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

@Component({})
export default class CreateEventDialog extends Vue {
  requiredRules = {
    title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
  };

  tripEvent = {
    user_id: this.$store.state.authentication.user.id,
    trip_day_id: this.$store.state.trip.tripDayDetail.id,
    timezone_id: this.$store.state.trip.tripDayDetail.timezone_id,
    category_id: 1,
    title: '',
  };

  get timezoneList() {
    return this.$store.state.util.timezone;
  }

  get currencyList() {
    return this.$store.state.util.currency;
  }

  closeDialog() {
    this.$store.dispatch('openCreateEventDialog', false);
  }

  createTripEvent() {
    let eventForm: any = this.$refs.eventForm;
    eventForm.validate((valid: boolean) => {
      if (valid) {
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
