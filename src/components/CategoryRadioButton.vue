<template>
  <el-radio-group v-model="internalValue" size="small">
    <el-radio-button label="1"><font-awesome-icon icon="walking" /> Activity</el-radio-button>
    <el-radio-button label="2"><font-awesome-icon icon="bus-alt" /> Transportation</el-radio-button>
    <el-radio-button label="3"><font-awesome-icon icon="info-circle" /> Info</el-radio-button>
    <el-radio-button label="4"><font-awesome-icon icon="hotel" /> Accommodation</el-radio-button>
    <el-radio-button label="5"><font-awesome-icon icon="plane" /> Flight</el-radio-button>
    <el-radio-button label="6"><font-awesome-icon icon="ship" /> Cruise</el-radio-button>
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class CategoryRadioButton extends Vue {
  @Prop()
  value: number;

  internalValue = this.value;

  @Watch('internalValue')
  onPropertyChanged(value: string) {
    this.$emit('input', Number(value));
  }
}
</script>

<style scoped></style>
