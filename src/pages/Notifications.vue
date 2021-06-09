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
import Makineler from "./makineler.js";

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
    makineUret(value, amount, id, pr_id) {
      console.log(
        "value: " +
          value +
          "\namount :" +
          amount +
          "\nsb_id: " +
          id +
          "\npr_id: " +
          pr_id
      );

      this.$axios
        .put("http://127.0.0.1:8000/subproducttree/" + id + "/", {
          amount: amount + value,
          product_id: pr_id,
        })
        .then((response) => console.log(response));
    },
    uret(value) {
      let sub_product_id = null;
      let sub_amount = null;
      console.log(value);
      let altUrunler = Urunler.altUrunBul(value);
      console.log(altUrunler);

      if (altUrunler[0] == "stok") {
        this.$alert("Stoktur");
        return;
      }

      let obj = null;
      let sayac = 0;

      this.$axios
        .get("http://127.0.0.1:8000/subproducttree/")
        .then((response) => {
          obj = response.data;

          for (let index = 0; index < obj.length; index++) {
            if (obj[index].product_id == value) {
              sub_product_id = obj[index].sub_product_id;
              sub_amount = obj[index].amount;
              break;
            }
          }
          var dizi = [];
          for (let index = 0; index < altUrunler.length; index++) {
            var sayac2 = 0;
            console.log("ilkfor");
            obj.forEach((element) => {
              if (element.product_id == altUrunler[index]) {
                //console.log(element.amount);
                if (element.amount != 0) {
                  dizi[sayac2++] = element.amount;
                  console.log("sad: " + dizi.length);
                  if (index == altUrunler.length - 1) {
                    this.makineUret(
                      Math.min(dizi),
                      sub_amount,
                      sub_product_id,
                      value
                    );
                    console.log("dizi: " + dizi.length);
                    for (let i = 0; i < dizi.length; i++) {
                      this.$axios
                        .get(
                          "http://127.0.0.1:8000/subproducttree/" +
                            altUrunler[i] +
                            "/"
                        )
                        .then((resp) => {
                          console.log("DenemeÇ: " + altUrunler[i]);

                          this.$axios
                            .put(
                              "http://127.0.0.1:8000/subproducttree/" +
                                altUrunler[i] +
                                "/",
                              {
                                amount: resp.data.amount - Math.min(dizi),
                                product_id: resp.data.product_id,
                              }
                            )
                            .then((response) => console.log(response));
                        });
                    }
                  }
                } else {
                  console.log(element.product_id);
                  this.uret(element.product_id);
                }
              }
              sayac++;
            });
          }
        });
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
