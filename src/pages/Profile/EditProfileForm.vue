<template>
  <card>
    <h5 slot="header" class="title">Profil</h5>
    <div class="row">
      <div class="col-md-12 pr-md-2">
        <v-text-field
          v-model="username"
          label="Kullanıcı Adı"
          filled
          append-icon="mdi-account"
          dark
        ></v-text-field>
        <v-text-field
          v-model="sifre"
          label="Şifre"
          filled
          type="password"
          append-icon="mdi-lock"
          dark
        ></v-text-field>
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
    this.username = JSON.parse(localStorage.getItem("current_user"))["name"];
    console.log(this.username);
  },
};
</script>
<style scoped>
.row {
  margin: auto;
  width: 100%;
  text-align: center;
}
</style>
