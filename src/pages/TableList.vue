<template>
  <card type="plain" title="Stoktakiler">
    <div class="base-demo">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:[`item.is_salable`]="{ item }">
          <v-simple-checkbox
            v-model="item.is_salable"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
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
      headers: [
        { text: "product_id", value: "product_id" },
        { text: "product_name", value: "product_name" },
        { text: "product_type", value: "product_type" },
        { text: "is_salable", value: "is_salable" }
      ],
      loaded: false
    };
  },
  components: { VueTableDynamic },
  methods: {
    getArray() {
      this.$axios.get("http://127.0.0.1:8000/products/").then(res => {
        this.desserts = res.data;
      });
      this.loaded = true;
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style></style>
