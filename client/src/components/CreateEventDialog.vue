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
      <el-form-item label="Title">
        <el-input v-model="tripEvent.title"></el-input>
      </el-form-item>
      <el-form-item label="Event time">
        <el-col :span="11">
          <el-time-picker v-model="tripEvent.start_time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="tripEvent.end_time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Start location">
        <el-input v-model="tripEvent.start_location"></el-input>
      </el-form-item>
      <el-form-item label="End location">
        <el-input v-model="tripEvent.end_location"></el-input>
      </el-form-item>

      <el-form-item label="Note">
        <el-input v-model="tripEvent.note" type="textarea"></el-input>
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
    trip_day_id: this.$store.state.trip.tripDayDetail.id,
    user_id: this.$store.state.authentication.user.id,
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
