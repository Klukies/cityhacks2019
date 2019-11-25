<template>
  <div class="hello" v-if="!isCalculating">
    <apexchart
      width="1400"
      type="bar"
      ref="chart"
      :options="graphOptions"
      :series="graphSeries"
    ></apexchart>
  </div>
</template>

<script>
import artForms from "./../assets/data/artForms";

export default {
  name: "HelloWorld",
  props: {
    selectedGraph: String
  },
  data() {
    return {
      artForms,
      amountOfTypes: null,
      customers: null,
      ageRanges: [],
      amountPerAgeRange: [],
      amountOfCustomersPerType: [],
      isCalculating: true,
      graphOptions: null,
      graphSeries: null
    };
  },
  created() {
    this.customers = require('./../assets/data/sectoren/' + this.selectedGraph + '.json');
    this.updateGraph();
    this.isCalculating = false;
  },
  methods: {
    updateGraph() {
      this.calculateAgeValues();
      this.calculateAmountForAgeValues();
      this.calculateStackedTypes();
      this.getGraph();
    },
    calculateAgeValues() {
      const ageValues = [];
      for (let i = 0; i < this.customers.length; i++) {
        if (
          this.customers[i].properties["Klant Leeftijdscategorie"] !== "" &&
          this.customers[i].properties["Klant Leeftijdscategorie"] !== " jaar" &&
          ageValues.indexOf(this.customers[i].properties["Klant Leeftijdscategorie"]) === -1
        ) {
          ageValues.push(this.customers[i].properties["Klant Leeftijdscategorie"]);
        }
      }
      ageValues.sort();
      this.ageRanges = ageValues;
    },
    calculateAmountForAgeValues() {
      const ageAmounts = [];
      for (let i = 0; i < this.ageRanges.length; i++) {
        ageAmounts.push(0);
      }
      for (let i = 0; i < this.customers.length; i++) {
        for (let j = 0; j < this.ageRanges.length; j++) {
          if (this.customers[i].properties["Klant Leeftijdscategorie"] === this.ageRanges[j]) {
            ageAmounts[j]++;
          }
        }
      }
      this.amountPerAgeRange = ageAmounts;
    },
    calculateStackedTypes() {
      const typesPerAge = [];
      for (let i = 0; i < this.artForms.length; i++) {
        typesPerAge.push({
          'name': this.artForms[i],
          'data': new Array(this.ageRanges.length).fill(0),
        });
      }
      for (let i = 0; i < this.customers.length; i++) {
        for (let j = 0; j < this.ageRanges.length; j++) {
          if (this.customers[i].properties["Klant Leeftijdscategorie"] === this.ageRanges[j]) {
            const filteredArtFormName = this.getFilteredArtForm(this.customers[i].properties["Voorstelling beschrijving"]);
            for (let type of typesPerAge) {
              if (type.name === filteredArtFormName) {
                type.data[j] += 1;
              }
            }
          }
        }
      }
      this.amountOfCustomersPerType = typesPerAge;
    },
    getFilteredArtForm(artDescription) {
      for (let artForm of this.artForms) {
        if (artDescription.includes(artForm)) {
          return artForm;
        }
      }
      return "Divers";
    },
    getGraph() {
      this.graphOptions = {
        xaxis: {
          categories: this.ageRanges,
          axisTicks: {
            show: false
          }
        },
        chart: {
          stacked: true
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        title: {
          text: this.selectedGraph,
          align: "center"
        }
      };
      this.graphSeries = this.amountOfCustomersPerType;
    }
  },
  watch: {
    selectedGraph(graph) {
      this.customers = require('./../assets/data/sectoren/' + graph + '.json');
      this.updateGraph();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
