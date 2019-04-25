<template>
  <el-card class="box-card" shadow="never">
    <div>
      {{ tripDetail.name }}
      {{ tripDetail.destination }}
      {{ tripDetail.start_date }}
      {{ tripDetail.end_date }}
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class TripBanner extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }
}
</script>

<style scoped>
.box-card {
  min-height: 10rem;
}
</style>
