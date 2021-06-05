<template>
  <card type="plain" title="Stoktakiler">
    <div class="base-demo">
      <v-card>
        <v-card-title>
          Stok
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
          loading
          loading-text="Yükleniyor... Lütfen Bekleyiniz."
        >
          <template v-slot:[`item.is_salable`]="{ item }">
            <v-simple-checkbox
              v-model="item.is_salable"
              disabled
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </card>
</template>
<script>
import { BaseTable } from "@/components";
import VueTableDynamic from "vue-table-dynamic";
export default {
  data: function() {
    return {
      desserts: [],
      search: "",
      headers: [
        { text: "Ürün No", value: "product_id" },
        { text: "Ürün İsmi", value: "product_name" },
        { text: "Ürün Tipi", value: "product_type" },
        { text: "Satılma Durumu", value: "is_salable" },
        { text: "Adet", value: "amount" }
      ]
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios
        .get("http://127.0.0.1:8000/products/", {
          mode: "no-cors"
        })
        .then(res => {
          this.desserts = res.data;
          this.$axios
            .get("http://127.0.0.1:8000/subproducttree/", {
              mode: "no-cors"
            })
            .then(res => {
              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res.data.length; j++) {
                  if (this.desserts[i].product_id == res.data[j].product_id) {
                    this.desserts[i].amount = res.data[j].amount;
                  }
                }
              }
            });
        });
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
<style></style>
