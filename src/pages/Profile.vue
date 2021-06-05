<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
    <v-card style="width:66%">
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
        :items-per-page="5"
        :search="search"
        class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      model: {
        username: "michael23",
        firstName: "Mike",
        lastName: "Andrew",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
      },
      desserts: [],
      search: "",
      headers: [
        { text: "Sipariş No", value: "order_id" },
        { text: "Müşteri No", value: "customer_id" },
        { text: "Sipariş Tarihi", value: "order_date" },
        { text: "Son Teslim Tarihi", value: "deadline" },
        { text: "Ürün Sepet No", value: "order_item_id" },
        { text: "Ürün No", value: "product_id" },
        { text: "Adet", value: "amount" }
      ]
    };
  },
  methods: {
    getMyOrder() {
      console.log(JSON.parse(localStorage.getItem("current_user")).customer_id);
      this.$axios.get("http://127.0.0.1:8000/orders/").then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].customer_id ==
            JSON.parse(localStorage.getItem("current_user")).customer_id
          ) {
            this.desserts.push(response.data[i]);
          }
        }
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
    this.getMyOrder();
  }
};
</script>
<style></style>
