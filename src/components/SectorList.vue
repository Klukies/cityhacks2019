<template>
  <div class="list" style="max-height: 100vh; overflow-y: auto; text-align: left">
    <ul>
      <li v-for="sector in sectoren" :key="sector" style="cursor: pointer">
        <a @click="$emit('updateGraph', sector)" style="width: 100%; display: block" :style="[sector === selectedGraph ? {'background-color': 'pink', 'font-weight': 'bold'} : '']">{{ sector }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import sectoren from "./../assets/data/sectoren";

export default {
  name: "SectorList",
  props: {
    selectedGraph: String
  },
  data() {
    return {
      sectoren: sectoren
    };
  }
};
</script>

<style scoped></style>
