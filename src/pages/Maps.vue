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
            <template v-slot:[`item.action`]="">
              <v-btn icon large elevation="12" @click="Onayla()">
                <v-icon left>mdi-check </v-icon>
              </v-btn>
              <v-btn icon large elevation="12" @click="IptalEt()">
                <v-icon left>mdi-delete </v-icon>
              </v-btn>
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
        { text: "Sipariş No", value: "order_id" },
        { text: "Müşteri No", value: "customer_id" },
        { text: "Sipariş Tarihi", value: "order_date" },
        { text: "Son Teslim Tarihi", value: "deadline" },
        { text: "Düzenle", value: "action" }
      ],
      loaded: false
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios
        .get("http://127.0.0.1:8000/orders/", {
          mode: "no-cors"
        })
        .then(res => {
          this.desserts = res.data;
        });
      this.loaded = true;
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
