<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header mb-5">
          <h5 class="card-category">Black Table Heading</h5>
          <h3 class="card-title">Created using Poppins Font Family</h3>
        </div>

        <div class="card-body">
          <v-card>
            <v-card-title>
              Stok Ürünler
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
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-text-field
                  v-model="editedamount"
                  label="Adet"
                  type="number"
                  small
                  counter
                  maxlength="10"
                  hint="Maksimum 10 Rakam Giriniz."
                ></v-text-field>
                <v-btn block @click="ekle(item)">
                  Ekle
                  <v-icon dark right>mdi-plus </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editedamount: 0,
      desserts: [],
      search: "",
      headers: [
        { text: "Ürün No", value: "product_id" },
        { text: "Ürün İsmi", value: "product_name" },
        { text: "Ürün Tipi", value: "product_type" },
        { text: "Satılma Durumu", value: "is_salable" },
        { text: "Stok No", value: "sub_product_id" },
        { text: "Adet", value: "amount" },
        { text: "Ekle", value: "action" },
      ],
    };
  },
  methods: {
    getApi() {
      this.$axios.get("http://127.0.0.1:8000/products/").then((res) => {
        this.desserts = res.data;
        this.desserts = this.desserts.filter(
          (item) => item.product_type == "stok"
        );
        this.$axios.get("http://127.0.0.1:8000/subproducttree/").then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < this.desserts.length; j++) {
              if (res.data[i].product_id == this.desserts[j].product_id) {
                this.desserts[j].sub_product_id = res.data[i].sub_product_id;
                this.desserts[j].amount = res.data[i].amount;
              }
            }
          }
        });
      });
    },
    ekle(selecteditem) {
      var sum = 0;
      if (this.editedamount > 0 && this.editedamount < 10000000000) {
        sum = Number(this.editedamount) + Number(selecteditem.amount);
        this.$axios.put(
          "http://localhost:8000/subproducttree/" +
            selecteditem.sub_product_id +
            "/",
          {
            product_id: selecteditem.product_id,
            amount: sum,
          }
        );
        this.$alert("Ürün Stoğa Eklendi.");
      } else {
        this.$alert("Geçerli Bir Adet Giriniz.");
      }
    },
    yenile() {
      this.$forceUpdate();
    },
  },
  created() {
    this.getApi();
  },
};
</script>
<style></style>
