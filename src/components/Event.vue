<template>
  <el-card shadow="hover">
    <el-row type="flex" align="middle">
      <el-col :span="22">
        <div style="font-size: 1.5rem">{{ tripEvent.title }}</div>
        <div v-if="tripEvent.start_time" class="event-text">Start time: {{ tripEvent.start_time }}</div>
        <div v-if="tripEvent.end_time" class="event-text">End time: {{ tripEvent.end_time }}</div>
        <div v-if="tripEvent.start_location" class="event-text">Start location: {{ tripEvent.start_location }}</div>
        <div v-if="tripEvent.end_location" class="event-text">End location: {{ tripEvent.end_location }}</div>
      </el-col>
      <el-col :span="2">
        <el-button @click="editEvent" type="primary" size="mini" circle><font-awesome-icon icon="edit"/></el-button>
        <el-button type="danger" size="mini" circle><font-awesome-icon icon="trash-alt"/></el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Event as TripEvent } from '../models/event';
import { Actions } from '../constants/actions';

@Component
export default class Event extends Vue {
  @Prop()
  tripEvent: TripEvent;

  editEvent() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
    this.$store.dispatch(Actions.UPDATE_EDIT, {
      isEditMode: true,
      idInEdit: this.tripEvent.id,
      component: 'tripEvent',
    });
  }
}
</script>

<style scoped>
.event-text {
  line-height: 1.8rem;
}
</style>
