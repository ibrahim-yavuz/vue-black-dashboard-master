<template>
  <card type="plain" title="Stoktakiler">
    <div class="base-demo">
      <v-card>
        <v-card-title>
          Stok
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
        { text: "product_id", value: "product_id" },
        { text: "product_name", value: "product_name" },
        { text: "product_type", value: "product_type" },
        { text: "is_salable", value: "is_salable" },
        { text: "amount", value: "amount" }
      ]
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios.get("http://127.0.0.1:8000/products/").then(res => {
        this.desserts = res.data;
        this.$axios.get("http://127.0.0.1:8000/subproducttree/").then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.desserts[i].product_id == res.data[j].product_id) {
                this.desserts[i].amount = res.data[j].amount;
              }
            }
          }
        });
      });
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style></style>
