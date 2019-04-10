<template>
  <div>
    <div
      v-if="isLoading"
      :style="{ width: '100%', textAlign: 'center' }">
      <i class="el-icon-loading loading-spinner" />
      Loading...
    </div>
    <div v-else>
      <el-alert
        v-if="alert.message"
        :title="alert.message"
        :type="alert.type"
        :closable="false"
        show-icon />
      <div v-if="!tripDayDetail.events">
        <el-alert
          title="You have no event..."
          type="info"
          show-icon />
      </div>
      <div v-else>
        <div v-for="event in tripDayDetail.events">
          <div>Title: {{ event.title }}</div>
          <div>Start time: {{ event.start_time }}</div>
          <div>End time: {{ event.end_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class TripEvent extends Vue {
  get alert() {
    return this.$store.state.alert;
  }

  get isLoading() {
    return this.$store.state.trip.isLoading;
  }

  get tripDayDetail() {
    return this.$store.state.trip.tripDayDetail;
  }
}
</script>

<style scoped></style>
