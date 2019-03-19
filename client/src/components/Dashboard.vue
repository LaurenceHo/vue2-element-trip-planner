<template>
    <div class="main-content">
      <div v-if="isLoading" :style="{width: '100%', textAlign: 'center'}">
        <i class="el-icon-loading loading-spinner"></i>
        Loading...
      </div>
      <div v-else>
        <div v-if="trips.size === 0">You have no trip!</div>
        <div v-else>
          <el-card class="box-card" v-for="trip in trips" :title="trip.name">
            <div slot="header" class="clearfix">
              <span>{{trip.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">Detail</el-button>
            </div>
            <div>
              <p>Start date: {{trip.start_date}}</p>
              <p>End date: {{trip.end_date}}</p>
              <p>Destination: {{trip.destination}}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getAllTrips } from '../services/trip-service';
  import { Trip } from '../models/trip';

  @Component({})

  export default class Dashboard extends Vue {
    trips: Trip[] = [];
    isLoading: boolean = false;

    beforeMount() {
      this.isLoading = true;
      getAllTrips().then((trips: Trip[]) => {
        this.trips = trips;
        this.isLoading = false;
      });
    }
  }
</script>

<style scoped>
  .main-content {
    min-height: 60rem;
    padding: 0 2rem;
  }

  .loading-spinner {
    font-size: 3rem;
    display: inline-block;
  }

  .box-card {
    width: 42rem;
    margin: 1rem 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
