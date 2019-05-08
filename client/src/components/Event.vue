<template>
  <el-card shadow="hover">
    <div>Title: {{ event.title }}</div>
    <div>Start time: {{ event.start_time }}</div>
    <div>End time: {{ event.end_time }}</div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Event extends Vue {
  @Prop()
  event: object;
}
</script>

<style scoped></style>
