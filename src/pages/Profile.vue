<template>
  <div class="row">
    <div class="col-md-12">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
    <card type="plain" title="Siparişler">
      <div class="base-demo">
        <v-card>
          <v-card-title>
            Aktif Siparişlerim
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
            loading-text="Satıcı Girişi Yaptınız ya da Aktif Siparişiniz Yok."
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
      desserts: [],
      search: "",
      headers: [
        { text: "Sipariş No", value: "order_id" },
        { text: "Müşteri No", value: "customer_id" },
        { text: "Sipariş Tarihi", value: "order_date" },
        { text: "Son Teslim Tarihi", value: "deadline" },
        { text: "Sepet No", value: "order_item_id" },
        { text: "Ürün No", value: "product_id" },
        { text: "Adet", value: "amount" }
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
      var userid = JSON.parse(localStorage.getItem("current_user"))[
        "customer_id"
      ];
      this.$axios.get("http://127.0.0.1:8000/orders/").then(res => {
        this.desserts = res.data;
        this.desserts = this.desserts.filter(e => e.customer_id == userid);
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
        });
      });
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
