<template>
  <el-card class="box-card" shadow="never">
    <div>
      <el-button-group>
        <el-button @click="editTrip" type="primary" size="mini"><font-awesome-icon icon="edit"/></el-button>
        <el-button @click="archiveTrip" type="primary" size="mini"><font-awesome-icon icon="archive"/></el-button>
      </el-button-group>
    </div>
    <div class="trip-destination-text">
      {{ tripDetail.destination }}
    </div>
    <div class="trip-date-text">
      <font-awesome-icon icon="calendar-alt" /> {{ tripDetail.start_date }} to
      {{ tripDetail.end_date }}
    </div>
    <div v-if="tripDetail.name" class="trip-detail-text">
      {{ tripDetail.name }}
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

  editTrip() {
    // TODO
  }

  archiveTrip() {
    this.tripDetail.archived = true;
    this.$store.dispatch('trip/updateTrip', this.tripDetail);
  }
}
</script>

<style scoped>
.box-card {
  min-height: 10rem;
}
.trip-destination-text {
  font-size: 2.2rem;
  font-weight: 700;
}
.trip-date-text {
  line-height: 1.8rem;
  font-weight: 500;
}
.trip-detail-text {
  line-height: 1.8rem;
}
</style>
