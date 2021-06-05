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
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                icon
                large
                elevation="12"
                @click="Onayla(item.order_id, item.order_item_id)"
              >
                <v-icon left>mdi-check </v-icon>
              </v-btn>
              <v-btn
                icon
                large
                elevation="12"
                @click="IptalEt(item.order_id, item.order_item_id)"
              >
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
        { text: "Adet", value: "amount" },
        { text: "Ürün No", value: "product_id" },
        { text: "Ürün Sepet No", value: "order_item_id" },
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
          this.$axios
            .get("http://127.0.0.1:8000/orderitems/", {
              mode: "no-cors"
            })
            .then(res => {
              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res.data.length; j++) {
                  if (this.desserts[i].order_id == res.data[j].order_id) {
                    this.desserts[i].amount = res.data[j].amount;
                    this.desserts[i].product_id = res.data[j].product_id;
                    this.desserts[i].order_item_id = res.data[j].order_item_id;
                  }
                }
              }
            });
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
    },
    Onayla(id, itemid) {
      this.$axios
        .delete("http://localhost:8000/orders/" + id + "/")
        .then(response =>
          this.$axios.delete("http://localhost:8000/orderitems/" + itemid + "/")
        );
    },
    IptalEt(id, itemid) {
      this.$axios
        .delete("http://localhost:8000/orders/" + id + "/")
        .then(response =>
          this.$axios.delete("http://localhost:8000/orderitems/" + itemid + "/")
        );
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style scoped></style>
