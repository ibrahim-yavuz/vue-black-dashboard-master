<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  SON 10 SİPARİŞ
                </h5>
                <h2 class="card-title">Sipariş Adeti</h2>
              </div>

              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
            </h3>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success"></i> 12,100K
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{ 'text-right': isRTL }">
          <template slot="header">
            <h6 class="title d-inline">
              {{ $t("dashboard.tasks", { count: 5 }) }}
            </h6>
            <p class="card-category d-inline">{{ $t("dashboard.today") }}</p>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
              :class="{ 'float-left': isRTL }"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.action")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.anotherAction")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.somethingElse")
              }}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <h4 slot="header" class="card-title">
            {{ $t("dashboard.simpleTable") }}
          </h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable
  },
  data() {
    return {
      customers: [],
      orders: [],
      cikolataOn: [],
      cilekOn: [],
      muzOn: [],
      bigLineChart: {
        allData: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "OCAK",
            "ŞUBAT",
            "MART",
            "NİSAN",
            "MAYIS",
            "HAZİRAN",
            "TEMMUZ",
            "AĞUSTOS",
            "EYLÜL",
            "EKİM",
            "KASIM",
            "ARALIK"
          ]
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["TEMMUZ", "AĞUSTOS", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)"
        ],
        gradientStops: [1, 0.4, 0]
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["a", "b", "c", "d", "e", "f"],
          datasets: [
            {
              label: "Toplam Adet",
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [5, 8, 9, 1, 5, 3]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient
      }
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    }
  },
  methods: {
    loadData() {
      this.$axios.get("http://127.0.0.1:8000/orderitems/").then(res => {
        for (let i = res.data.length - 1; i >= 0; i--) {
          if (res.data[i].product_id == 20) {
            if (this.cikolataOn.length < 10) {
              this.cikolataOn.push(res.data[i].amount);
            }
          } else if (res.data[i].product_id == 21) {
            if (this.cilekOn.length < 10) {
              this.cilekOn.push(res.data[i].amount);
            }
          } else if (res.data[i].product_id == 22) {
            if (this.muzOn.length < 10) {
              this.muzOn.push(res.data[i].amount);
            }
          }
        }
        this.bigLineChart.allData = [this.cikolataOn, this.cilekOn, this.muzOn];
      });
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }
        ],
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    getBar() {
      this.$axios.get("http://127.0.0.1:8000/customers/").then(res => {
        this.customers = res.data;
        for (let i = 0; i < this.customers.length; i++) {
          this.customers[i].adet = 0;
        }
        this.$axios.get("http://127.0.0.1:8000/orders/").then(res => {
          this.orders = res.data;
          this.$axios.get("http://127.0.0.1:8000/orderitems/").then(res => {
            for (let i = 0; i < this.orders.length; i++) {
              for (let j = 0; j < res.data.length; j++) {
                if (this.orders[i].order_id == res.data[j].order_id) {
                  this.orders[i].amount = res.data[j].amount;
                }
              }
            }
            //--------------
            for (let i = 0; i < this.orders.length; i++) {
              for (let j = 0; j < this.customers.length; j++) {
                if (
                  this.customers[j].customer_id == this.orders[i].customer_id
                ) {
                  this.customers[j].adet += this.orders[i].amount;
                }
              }
            }
            console.log(this.customers);
          });
        });
      });
    }
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  created() {
    this.getBar();
    try {
      var data = fetch("http://127.0.0.1:8000/customers")
        .then(response => response.json())
        .then(data => (globalVar = data[0]["name"]));
      console.log(globalVar);
    } catch (error) {
      console.log(error);
    }
    this.loadData();
  },

  update() {},
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style></style>
