<template>
  <div class="row">
    <div class="col-md-12">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
    <card type="plain">
      <div class="base-demo" v-if="loaded">
        <v-card dark>
          <v-card-title>
            Aktif Siparişlerim
            <v-spacer>
              <v-btn icon large elevation="12" @click="yenile()" dark>
                <v-icon>mdi-reload </v-icon>
              </v-btn>
            </v-spacer>
            <v-text-field
              v-model="search"
              dark
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
            :items-per-page="5"
            class="elevation-1"
            loading
            loading-text="Aktif Siparişiniz Yok."
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
  </div>
</template>

<script>
import EditProfileForm from "./Profile/EditProfileForm";
export default {
  components: {
    EditProfileForm
  },
  data() {
    return {
      loaded: false,
      desserts: [],
      search: "",
      headers: [
        { text: "Sipariş No", value: "order_id" },
        { text: "Müşteri No", value: "customer_id" },
        { text: "Sipariş Tarihi", value: "order_date" },
        { text: "Son Teslim Tarihi", value: "deadline" },
        { text: "Sepet No", value: "order_item_id" },
        { text: "Ürün No", value: "product_id" },
        { text: "Adet", value: "amount" },
        { text: "Aktif mi?", value: "isbool", align: " d-none" } //sadece tarihi geçenleri elemek için kullanılıyor.
      ],
      model: {
        company: "Creative Code Inc.",
        email: "mike@email.com",
        username: "michael23",
        firstName: "Mike",
        lastName: "Andrew",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "Melbourne",
        country: "Australia",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
      }
    };
  },
  methods: {
    getOrder() {
      var curr = this.currentDateTime()
        .split("-")
        .join("");
      var userid = JSON.parse(localStorage.getItem("current_user"))[
        "customer_id"
      ];
      this.$axios.get("http://127.0.0.1:8000/orders/").then(res => {
        this.desserts = res.data;
        //kendi siparişlerini çekme
        this.desserts = this.desserts.filter(e => e.customer_id == userid);
        //süresi geçmişleri filtrele
        for (let i = 0; i < this.desserts.length; i++) {
          if (curr >= this.desserts[i].deadline.split("-").join("")) {
            this.desserts[i].isbool = true;
          } else {
            this.desserts[i].isbool = false;
          }
        }
        this.desserts = this.desserts.filter(e => e.isbool == true);

        this.$axios.get("http://127.0.0.1:8000/orderitems/").then(res => {
          for (let i = 0; i < this.desserts.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.desserts[i].order_id == res.data[j].order_id) {
                this.desserts[i].amount = res.data[j].amount;
                this.desserts[i].product_id = res.data[j].product_id;
                this.desserts[i].order_item_id = res.data[j].order_item_id;
              }
            }
          }

          this.loaded = true;
        });
      });
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
    yenile() {
      this.$forceUpdate();
    }
  },
  created() {
    if (localStorage.getItem("user_type") == "user") {
    } else if (localStorage.getItem("user_type") == "customer") {
      this.getOrder();
    }
  }
};
</script>
<style></style>
