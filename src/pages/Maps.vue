<template>
  <card type="plain" title="Siparişler">
    <div class="base-demo">
      <template>
        <v-card>
          <v-card-title>
            Sipariş Durumu
            <v-spacer>
              <v-btn icon large elevation="12" @click="yenile()">
                <v-icon>mdi-reload </v-icon>
              </v-btn>
            </v-spacer>

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
              <v-btn icon large elevation="12" @click="Onayla(item)">
                <v-icon>mdi-check </v-icon>
              </v-btn>
              <v-btn
                icon
                large
                elevation="12"
                @click="IptalEt(item.order_id, item.order_item_id)"
              >
                <v-icon>mdi-delete </v-icon>
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
      subtemp: [],
      temp: [],
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
        { text: "Stok No", value: "sub_product_id" },
        { text: "Düzenle", value: "action" }
      ],
      loaded: false
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios.get("http://127.0.0.1:8000/orders/").then(response => {
        this.desserts = response.data;
        this.$axios.get("http://127.0.0.1:8000/orderitems/").then(res => {
          for (let i = 0; i < this.desserts.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.desserts[i].order_id == res.data[j].order_id) {
                this.desserts[i].amount = res.data[j].amount;
                this.desserts[i].product_id = res.data[j].product_id;
                this.desserts[i].order_item_id = res.data[j].order_item_id;
              }
            }
          }
          this.$axios
            .get("http://127.0.0.1:8000/subproducttree/")
            .then(resp => {
              this.subtemp = resp.data;
              for (let i = 0; i < this.desserts.length; i++) {
                for (let j = 0; j < resp.data.length; j++) {
                  if (this.desserts[i].product_id == resp.data[j].product_id) {
                    this.desserts[i].sub_product_id =
                      resp.data[j].sub_product_id;
                  }
                }
              }
            });
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
    Onayla(selecteditem) {
      var yeni = 0;
      for (let i = 0; i < this.subtemp.length; i++) {
        if (this.subtemp[i].product_id == selecteditem.product_id) {
          if (this.subtemp[i].amount >= selecteditem.amount) {
            yeni = this.subtemp[i].amount - selecteditem.amount;
            this.$axios.put(
              "http://localhost:8000/subproducttree/" +
                selecteditem.sub_product_id +
                "/",
              {
                product_id: selecteditem.product_id,
                amount: yeni
              }
            );
            this.$axios.delete(
              "http://localhost:8000/orders/" + selecteditem.order_id + "/"
            );
            this.$axios.delete(
              "http://localhost:8000/orderitems/" +
                selecteditem.order_item_id +
                "/"
            );

            this.desserts = this.desserts.filter(
              item => item.order_id != selecteditem.order_id
            );

            this.$alert(
              selecteditem.order_id +
                "' Numaralı Sipariş " +
                selecteditem.customer_id +
                "' Numaralı Müşteriye Teslim Edildi."
            );
          } else {
            this.$alert("İstenilen Ürüne Ait Yeterli Stok Yok");
          }
        }
      }
    },

    IptalEt(id, itemid) {
      this.$axios
        .delete("http://localhost:8000/orders/" + id + "/")
        .then(response =>
          this.$axios
            .delete("http://localhost:8000/orderitems/" + itemid + "/")
            .then(res => {
              this.desserts = this.desserts.filter(item => item.order_id != id);
              this.$alert(id + "'Numaralı Sipariş İptal Edildi.");
            })
        );
    },

    yenile() {
      this.$forceUpdate();
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style scoped></style>
