<template>
  <card type="plain" title="Siparişler">
    <div class="base-demo">
      <template>
        <v-card>
          <v-card-title>
            Sipariş Durumu
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Ara"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:[`item.deadline`]="{ item }">
              <v-chip outlined>
                {{ item.deadline }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </div>
  </card>
</template>
<script>
import VueTableDynamic from "vue-table-dynamic";
export default {
  data: function() {
    return {
      splited: null,
      splitedDate: null,
      desserts: [],
      search: "",
      headers: [
        { text: "order_id", value: "order_id" },
        { text: "customer_id", value: "customer_id" },
        { text: "order_date", value: "order_date" },
        { text: "deadline", value: "deadline" }
      ],
      loaded: false
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios.get("http://127.0.0.1:8000/orders/").then(res => {
        this.desserts = res.data;
      });
      this.loaded = true;
    },
    getColor(date) {
      this.splited = date.split("-");
      this.splitedDate = this.currentDateTime;
      if (this.splited[0] > this.splitedDate[0]) {
        return "green";
      } else if (this.splited[0] == this.splitedDate[0]) {
        if (this.splited[1] > this.splitedDate[1]) {
          return "green";
        } else if (this.splited[1] == this.splitedDate[1]) {
          if (this.splited[2] > this.splitedDate[2]) {
            return "green";
          } else if (this.splited[2] == this.splitedDate[2]) {
            return "orange";
          } else {
            return "red";
          }
        } else {
          return "red";
        }
      } else {
        return "red";
      }
    },
    currentDateTime() {
      const current = new Date();
      const day0 =
        current.getDate() < 10 ? "0" + current.getDate() : current.getDate();

      const month0 =
        current.getMonth() + 1 < 10
          ? "0" + (current.getMonth() + 1)
          : current.getMonth() + 1;

      const date = current.getFullYear() + "-" + month0 + "-" + day0;

      const dateTime = date;

      return dateTime;
    },
    onButtonClick(item) {
      console.log("click on " + item.orderi_id);
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style scoped></style>
