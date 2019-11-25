<template>
  <div class="home" style="display: flex">
    <sector-list @updateGraph="graph => selectedGraph = graph" :selected-graph="selectedGraph"></sector-list>
    <HelloWorld :selected-graph="selectedGraph"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SectorList from "@/components/SectorList";

export default {
  name: "home",
  components: {
    SectorList,
    HelloWorld
  },
  data() {
    return {
      selectedGraph: 'ABDIJ ZEVENKERKE',
    };
  }
};
</script>
