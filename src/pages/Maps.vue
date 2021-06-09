<template>
  <card type="plain" title="Siparişler">
    <div class="base-demo" v-if="loaded">
      <template>
        <v-card dark>
          <v-card-title>
            Sipariş Durumu
            <v-spacer>
              <v-btn icon large @click="yenile()" dark>
                <v-icon>mdi-reload </v-icon>
              </v-btn>
            </v-spacer>

            <v-text-field
              dark
              v-model="search"
              append-icon="mdi-magnify"
              label="Ara"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            dark
            :headers="headers"
            :items="desserts"
            :search="search"
            class="elevation-1"
            loading
            loading-text="Yükleniyor... Lütfen Bekleyiniz."
          >
            <template v-slot:[`item.deadline`]="{ item }">
              <v-chip outlined v-bind:style="{ background: getColor(item) }">
                {{ item.deadline }}
              </v-chip>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn icon large @click="Onayla(item)">
                <v-icon>mdi-check </v-icon>
              </v-btn>
              <v-btn icon large @click="IptalEt(item)">
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
      message: " Numaralı Sipariş Silindi.",
      splitedDate: null,
      desserts: [],
      temp: [],
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
                .then(res => {
                  this.temp = res.data;
                  this.loaded = true;
                });
            });
        });
    },
    getColor(item) {
      var curr = this.currentDateTime()
        .split("-")
        .join("");
      var dead = item.deadline.split("-").join("");
      if (Number(dead) > Number(curr)) {
        return "green !important";
      } else {
        return "red !important";
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

    Onayla(item) {
      this.message = " Numaralı Spiariş Onaylandı. ";
      var adet = 0;
      for (let i = 0; i < this.temp.length; i++) {
        if (item.product_id == this.temp[i].product_id) {
          if (item.amount <= this.temp[i].amount) {
            adet = Number(this.temp[i].amount - Number(item.amount));
            this.$axios
              .put(
                "http://localhost:8000/subproducttree/" +
                  this.temp[i].sub_product_id +
                  "/",
                {
                  product_id: item.product_id,
                  amount: adet
                }
              )
              .then(res => {
                this.IptalEt(item);
              });
          } else {
            this.$alert("Spiariş İçin Yeterli Stok Yok.");
          }
        }
      }
    },
    IptalEt(item) {
      this.$axios
        .delete("http://localhost:8000/orders/" + item.order_id + "/")
        .then(response =>
          this.$axios
            .delete(
              "http://localhost:8000/orderitems/" + item.order_item_id + "/"
            )
            .then(res => {
              this.desserts = this.desserts.filter(
                e => e.order_id != item.order_id
              );
              this.$alert(item.order_id + this.message);
              this.message = " Numaralı Spiariş Silindi. ";
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
