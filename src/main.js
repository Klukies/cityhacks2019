import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false;
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
