<template>
  <card>
    <h5 slot="header" class="title">Profil</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <v-text-field v-model="username" dark></v-text-field>
        <v-text-field v-model="sifre" dark></v-text-field>
        <v-btn @click="save" dark>Kaydet</v-btn>
      </div>
    </div>
  </card>
</template>
<script>
import BaseButton from "../../components/BaseButton.vue";
export default {
  components: { BaseButton },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      username: null,
      sifre: null,
      url: null,
    };
  },
  methods: {
    save() {
      console.log(this.username + " - " + this.sifre);
      if (localStorage.getItem("user_type") == "customer") {
        this.url =
          "http://127.0.0.1:8000/customers/" +
          JSON.parse(localStorage.getItem("current_user"))["customer_id"] +
          "/";
      } else if (localStorage.getItem("user_type") == "user") {
        this.url =
          "http://127.0.0.1:8000/users/" +
          JSON.parse(localStorage.getItem("current_user"))["user_id"] +
          "/";
      }

      this.$axios
        .put(this.url, { name: this.username, password: this.sifre })
        .then((response) => this.$alert("Değişiklikler başarıyla kaydedildi!"));
    },
  },
  created() {
    this.username = JSON.parse(localStorage.getItem("current_user"))["user_id"];
    console.log(this.username);
  },
};
</script>
<style>
</style>
