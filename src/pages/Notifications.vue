<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <h4 slot="header">Üretim</h4>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          @click:row="satirTiklama"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn icon large elevation="12" @click="">
              <v-icon>mdi-plus </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </card>
    </div>
  </div>
</template>
<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlert } from "@/components";

export default {
  components: {
    BaseAlert,
  },
  data() {
    return {
      urun: null,
      altUrun: null,
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
      items: [],
      headers: [
        { text: "Ürün No", value: "urun_id" },
        { text: "Ürün İsmi", value: "urun_ismi" },
        { text: "Ürün Tipi", value: "urun_tipi" },
        { text: "Satılma Durumu", value: "satilabilme_durumu" },
        { text: "Adet", value: "miktar" },
        { text: "Üret", value: "action" },
      ],
    };
  },
  methods: {
    satirTiklama(value) {},
    uret(id) {
      this.$alert("Seçmiş olduğunuz satırın ID'si: " + id + " dir");
    },
  },
  created() {
    let urun_url = "http://127.0.0.1:8000/products/";
    let alt_urun_url = "http://127.0.0.1:8000/subproducttree/";
    this.$axios.get(urun_url).then((response) => {
      this.urun = response.data;
      this.$axios.get(alt_urun_url).then((response) => {
        this.altUrun = response.data;

        for (let i = 0; i < this.urun.length; i++) {
          this.items.push({
            urun_id: this.urun[i].product_id,
            urun_ismi: this.urun[i].product_name,
            urun_tipi: this.urun[i].product_type,
            satilabilme_durumu: this.urun[i].is_salable,
            miktar: this.altUrun[i].amount,
          });
        }
      });
    });
  },
};
</script>
<style>
</style>
