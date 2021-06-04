<template>
  <card type="plain" title="Siparişler">
    <div class="base-demo">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      </v-data-table>
    </div>
  </card>
</template>
<script>
import VueTableDynamic from "vue-table-dynamic";
export default {
  data: function() {
    return {
      desserts: [],
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
    }
  },

  created() {
    this.getArray();
  }
};
</script>
<style></style>
