<template>
  <el-card class="box-card" shadow="never">
    <div>
      <el-button @click="editTrip" type="primary" size="mini"><font-awesome-icon icon="edit"/></el-button>
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
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TripBanner extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  editTrip() {
    this.$store.dispatch('dashboard/openTripForm', true);
    this.$store.dispatch('dashboard/updateEdit', { isEditMode: true, idInEdit: this.tripDetail.id, component: 'trip' });
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
