<template>
  <div>
    <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" :closable="true" show-icon />
    <div v-if="isLoading" :style="{ width: '100%', textAlign: 'center' }">
      <i class="el-icon-loading loading-spinner" />
      Loading...
    </div>
    <div v-else>
      <div v-if="tripDayDetail">
        <el-row>
          <el-col :span="20">
            {{ tripDayDetail.trip_date }}
            {{ tripDayDetail.name }}
          </el-col>
          <el-col :span="4">
            <el-button @click="openCreateDialog()" class="create-button" type="primary">
              <font-awesome-icon icon="plus" class="menu-icon" />
              New Event
            </el-button>
          </el-col>
        </el-row>
        <div v-for="event in tripDayDetail.events">
          <el-row class="box-card" shadow="hover">
            <div>
              <div>Title: {{ event.title }}</div>
              <div>Start time: {{ event.start_time }}</div>
              <div>End time: {{ event.end_time }}</div>
            </div>
          </el-row>
        </div>
      </div>
      <div v-else>
        <el-alert title="You don't have trip detail. Please create trip day at first" type="info" show-icon />
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

  openCreateDialog() {
    // TODO
  }
}
</script>

<style scoped>
.box-card {
}
</style>
