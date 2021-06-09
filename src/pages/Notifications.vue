<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <h4 slot="header">Üretim</h4>
        <v-data-table
          dark
          :headers="headers"
          :items="items"
          class="elevation-1"
          @click:row="satirTiklama"
          :items-per-page="5"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn icon large elevation="12" @click="uret(item.urun_id)">
              <v-icon>mdi-plus </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </card>

      <card>
        <h4 slot="header">Makineler</h4>
        <v-data-table
          dark
          :headers="makine_headers"
          :items="makine_items"
          class="elevation-1"
          @click:row="makineSatirTiklama"
        >
        </v-data-table>
      </card>
    </div>
  </div>
</template>
<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlert } from "@/components";
import Urunler from "./gerekli_urunler.js";

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
      makine_items: [],
      makine_headers: [
        { text: "Makine ID", value: "work_center_id" },
        { text: "Makine İsmi", value: "work_center_name" },
        { text: "Durum", value: "active" },
        { text: "Çalışma Süresi", value: "work_time" },
      ],
    };
  },
  methods: {
    satirTiklama(value) {},
    makineSatirTiklama(value) {
      console.log(value.work_center_name);
    },
    uret(value) {
      let dizi = [];
      let altUrunler = Urunler.altUrunBul(value);
      console.log(altUrunler);

      for (let index = 0; index < altUrunler.length; index++) {
        this.$axios
          .get("http://127.0.0.1:8000/subproducttree/")
          .then((response) => {
            response.data.forEach((element) => {
              if (element.product_id == altUrunler[index]) {
                //console.log(element.amount);
                if (element.amount != 0) {
                  dizi.push(element.amount);
                } else {
                  console.log(element.product_id);
                  this.uret(element.product_id);
                }

                //console.log(Math.min(dizi));
              }

              makineUret(Math.min(dizi));
            });
          });
      }
    },
  },
  created() {
    let urun_url = "http://127.0.0.1:8000/products/";
    let alt_urun_url = "http://127.0.0.1:8000/subproducttree/";
    let makine_url = "http://127.0.0.1:8000/workcenters/";

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

    this.$axios.get(makine_url).then((response) => {
      for (let index = 0; index < response.data.length; index++) {
        this.makine_items.push({
          work_center_id: response.data[index].work_center_id,
          work_center_name: response.data[index].work_center_name,
          active: response.data[index].active,
        });
      }
    });
  },
};
</script>
<style>
</style>
