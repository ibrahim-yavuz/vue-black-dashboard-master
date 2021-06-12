<template>
  <div class="row">
    <div class="col-md-12">
      <v-card dark>
        <v-card-title>
          Tüm üretimi durdur
          <v-spacer>
            <v-btn icon large elevation="12" @click="sureli(0, false)" dark>
              <v-icon>mdi-pause </v-icon>
            </v-btn>
          </v-spacer>
        </v-card-title>
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
            <v-btn
              icon
              large
              elevation="12"
              @click="sureli(item.urun_id, true)"
            >
              <v-icon>mdi-plus </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

      <v-card dark> <br /><br /><br /><br /></v-card>

      <v-card v-if="load" dark>
        <v-card-title>
          Makineler
          <v-spacer>
            <v-btn icon large elevation="12" @click="makineVeriCek()" dark>
              <v-icon>mdi-reload </v-icon>
            </v-btn>
          </v-spacer>
        </v-card-title>
        <h4 slot="header">Makineler</h4>
        <v-data-table
          dark
          :headers="makine_headers"
          :items="makine_items"
          class="elevation-1"
          @click:row="makineSatirTiklama"
          ><template v-slot:[`item.active`]="{ item }">
            <v-simple-checkbox
              v-model="item.active"
              disabled
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlert } from "@/components";
import Urunler from "./gerekli_urunler.js";
import Makineler from "./makineler.js";
import makineler from "./makineler.js";

export default {
  components: {
    BaseAlert
  },
  data() {
    return {
      load: false,
      tiklama_sayaci: 0,
      tekrar_calistir: false,
      urun: null,
      makine_hizi: 1,
      interval_: null,
      altUrun: null,
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      items: [],
      calisanMakineler: [],
      headers: [
        { text: "Ürün No", value: "urun_id" },
        { text: "Ürün İsmi", value: "urun_ismi" },
        { text: "Ürün Tipi", value: "urun_tipi" },
        { text: "Satılma Durumu", value: "satilabilme_durumu" },
        { text: "Adet", value: "miktar" },
        { text: "Üret", value: "action" }
      ],
      makine_items: [],
      makine_headers: [
        { text: "Makine ID", value: "work_center_id" },
        { text: "Makine İsmi", value: "work_center_name" },
        { text: "Durum", value: "active" },
        { text: "İşlem ID", value: "operation_id" },
        { text: "Hız", value: "speed" },
        { text: "Ürün Tipi", value: "product_type" }
      ]
    };
  },
  methods: {
    icindeVarMi(dizi, id) {
      for (let index = 0; index < dizi.length; index++) {
        if (id == dizi[index].id) {
          this.$alert("Bu makine zaten çalışıyor!");
          return true;
        }
      }
      return false;
    },
    uret(value) {
      let altUrunler = Urunler.altUrunBul(value);
      let altUrunlerMiktarlar = [];
      let min_miktar = 0;
      let current_sb_prd_id = null;

      if (altUrunler[0] == "stok") {
        this.$alert(
          value + " ID'li ürün stokta bulunmamaktadır!",
          "Stok Bulunamadı"
        );
        return;
      }

      this.$axios
        .get("http://127.0.0.1:8000/products/" + value + "/")
        .then(res => {
          if (!this.icindeVarMi(this.calisanMakineler, value)) {
            this.calisanMakineler.push({
              id: value,
              product_type: res.data.product_type
            });
          }

          for (let index = 0; index < this.calisanMakineler.length; index++) {
            for (let j = 0; j < this.makine_items.length; j++) {
              if (
                this.calisanMakineler[index].product_type ==
                this.makine_items[j].product_type
              ) {
                this.makine_items[j].active = false;
                this.makine_hizi = this.makine_items[j].speed;

                this.$axios
                  .put(
                    "http://127.0.0.1:8000/workcenters/" +
                      this.makine_items[j].work_center_id +
                      "/",
                    {
                      work_center_name: this.makine_items[j].work_center_name,
                      active: false
                    }
                  )
                  .then(response => {
                    this.makineVeriCek();
                  });
              }
            }
          }

          this.$axios
            .get("http://127.0.0.1:8000/subproducttree/")
            .then(response => {
              for (let i = 0; i < altUrunler.length; i++) {
                for (let j = 0; j < response.data.length; j++) {
                  if (response.data[j].product_id == value) {
                    current_sb_prd_id = response.data[j].sub_product_id;
                  }

                  if (altUrunler[i] == response.data[j].product_id) {
                    altUrunlerMiktarlar.push({
                      id: altUrunler[i],
                      miktar: response.data[j].amount,
                      sb_id: response.data[j].sub_product_id
                    });
                  }
                }
              }

              min_miktar = altUrunlerMiktarlar[0].miktar;
              for (let i = 0; i < altUrunlerMiktarlar.length; i++) {
                if (altUrunlerMiktarlar[i].miktar < min_miktar) {
                  min_miktar = altUrunlerMiktarlar[i].miktar;
                }
              }

              console.log("hiz: " + this.makine_hizi);
              if (min_miktar < this.makine_hizi) {
                for (let k = 0; k < altUrunlerMiktarlar.length; k++) {
                  if (altUrunlerMiktarlar[k].miktar < this.makine_hizi) {
                    this.uret(altUrunlerMiktarlar[k].id);
                  }
                }
              } else {
                this.$axios
                  .get(
                    "http://127.0.0.1:8000/subproducttree/" +
                      current_sb_prd_id +
                      "/"
                  )
                  .then(response => {
                    this.$axios.put(
                      "http://127.0.0.1:8000/subproducttree/" +
                        current_sb_prd_id +
                        "/",
                      {
                        product_id: value,
                        amount: this.makine_hizi + response.data.amount
                      }
                    );

                    for (let i = 0; i < altUrunlerMiktarlar.length; i++) {
                      this.$axios.put(
                        "http://127.0.0.1:8000/subproducttree/" +
                          altUrunlerMiktarlar[i].sb_id +
                          "/",
                        {
                          product_id: altUrunlerMiktarlar[i].id,
                          amount:
                            altUrunlerMiktarlar[i].miktar - this.makine_hizi
                        }
                      );
                    }
                    this.makineVeriCek();
                    for (let i = 0; i < this.makine_items.length; i++) {
                      this.$axios
                        .put(
                          "http://127.0.0.1:8000/workcenters/" +
                            this.makine_items[i].work_center_id +
                            "/",
                          {
                            work_center_name: this.makine_items[i]
                              .work_center_name,
                            active: true
                          }
                        )
                        .then(response => {
                          this.calisanMakineler = [];
                        });
                    }
                  });
              }
            });
        });
    },

    sureli(item, surdur) {
      this.tiklama_sayaci++;
      for (let i = 0; i < this.calisanMakineler.length; i++) {
        if (this.icindeVarMi(this.calisanMakineler, value)) {
          return;
        }
      }
      var _this = this;
      if (surdur) {
        if (this.tiklama_sayaci < 2) {
          this.interval_ = setInterval(function() {
            _this.uret(item);
          }, 3000);
        } else {
          this.$alert("Halihazırda bir üretim devam ediyor!");
        }
      } else if (this.interval_ != null) {
        clearInterval(this.interval_);
        for (let i = 0; i < this.makine_items.length; i++) {
          this.$axios
            .put(
              "http://127.0.0.1:8000/workcenters/" +
                this.makine_items[i].work_center_id +
                "/",
              {
                work_center_name: this.makine_items[i].work_center_name,
                active: true
              }
            )
            .then(response => {
              this.makineVeriCek();
              this.interval_ = null;
              this.$alert("Üretim işlemi başarıyla durduruldu");
              this.calisanMakineler = [];
              this.tiklama_sayaci = 0;
            });
        }
      } else {
        this.$alert("Şu an gerçekleşen bir üretim bulunmamaktadır!");
      }
    },
    //makine tablosunun verilerini apiden çeker atama yapar ve yenilemek için tekrar kullanılabilir.
    makineVeriCek() {
      this.load = false;
      let operation_url = "http://127.0.0.1:8000/operations/";
      let work_center_url = "http://127.0.0.1:8000/workcenters/";
      let work_center_operation_url =
        "http://127.0.0.1:8000/workcenteroperation/";

      this.$axios.get(operation_url).then(operation => {
        this.$axios.get(work_center_url).then(wc => {
          this.$axios.get(work_center_operation_url).then(wc_op => {
            for (let index = 0; index < operation.data.length; index++) {
              this.makine_items[index].operation_id =
                operation.data[index].operation_id;
              this.makine_items[index].work_center_id =
                wc.data[index].work_center_id;
              this.makine_items[index].work_center_name =
                wc.data[index].work_center_name;
              this.makine_items[index].speed = wc_op.data[index].speed;
              this.makine_items[index].product_type =
                operation.data[index].product_type;
              this.makine_items[index].active = wc.data[index].active;
              this.load = true;
            }
          });
        });
      });
    }
  },
  created() {
    this.makineVeriCek();

    let urun_url = "http://127.0.0.1:8000/products/";
    let alt_urun_url = "http://127.0.0.1:8000/subproducttree/";
    let makine_url = "http://127.0.0.1:8000/workcenters/";

    this.$axios.get(urun_url).then(response => {
      this.urun = response.data;
      this.$axios.get(alt_urun_url).then(response => {
        this.altUrun = response.data;

        for (let i = 0; i < this.urun.length; i++) {
          this.items.push({
            urun_id: this.urun[i].product_id,
            urun_ismi: this.urun[i].product_name,
            urun_tipi: this.urun[i].product_type,
            satilabilme_durumu: this.urun[i].is_salable,
            miktar: this.altUrun[i].amount
          });
        }
      });
    });

    this.$axios.get(makine_url).then(response => {
      for (let index = 0; index < response.data.length; index++) {
        this.makine_items.push({
          work_center_id: response.data[index].work_center_id,
          work_center_name: response.data[index].work_center_name,
          active: response.data[index].active
        });
      }
    });
  }
};
</script>
<style></style>
