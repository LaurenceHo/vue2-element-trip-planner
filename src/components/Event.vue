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

@Component
export default class Event extends Vue {
  @Prop()
  event: TripEvent;

  editEvent() {
    this.$store.dispatch('dashboard/openTripEventForm', true);
    this.$store.dispatch('dashboard/updateEdit', { isEditMode: true, idInEdit: this.event.id, component: 'event' });
  }
}
</script>

<style scoped></style>
