<template>
  <el-card shadow="hover">
    <div>Title: {{ event.title }}</div>
    <div>Start time: {{ event.start_time }}</div>
    <div>End time: {{ event.end_time }}</div>
    <div>
      <el-button @click="editEvent" type="primary" size="mini"><font-awesome-icon icon="edit"/></el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Event as TripEvent } from '../models/event';
import { Actions } from '../constants/actions';

@Component
export default class Event extends Vue {
  @Prop()
  event: TripEvent;

  editEvent() {
    this.$store.dispatch(Actions.OPEN_TRIP_EVENT_FORM, true);
    this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: true, idInEdit: this.event.id, component: 'tripEvent' });
  }
}
</script>

<style scoped></style>
