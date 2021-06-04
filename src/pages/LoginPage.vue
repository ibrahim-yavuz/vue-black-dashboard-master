<template>
  <div id="kapsayici">
    <div class="input-div">
      <v-text-field
        class="inputs"
        filled
        prepend-inner-icon="mdi-account"
        dark
        placeholder="Kullanıcı Adı"
        v-model="kullanici_adi"
      ></v-text-field>
    </div>
    <div class="input-div">
      <v-text-field
        class="inputs"
        filled
        prepend-inner-icon="mdi-lock"
        dark
        placeholder="Şifre"
        v-model="sifre"
        type="password"
      ></v-text-field>
    </div>
    <div>
      <v-btn @click="tiklama" class="ma-2" tile color="indigo" dark>
        <v-icon left>mdi-login</v-icon>
        Giriş Yap
      </v-btn>
    </div>
  </div>
</template>
<script>
import vuetify from "@/plugins/vuetify";
export default {
  data() {
    return {
      kullanici_adi: null,
      sifre: null,
    };
  },
  methods: {
    tiklama() {
      let sayac = 0;
      let bulunduMu = false;
      this.$axios.get("http://localhost:8000/customers/").then((response) =>
        response.data.forEach((element) => {
          sayac++;
          if (
            this.kullanici_adi == element["name"] &&
            this.sifre == element["password"]
          ) {
            bulunduMu = true;
            console.log("Buraya girdi");
            this.$alert("Giriş Başarılı");
          } else if (sayac == response.data.length && !bulunduMu) {
            this.$alert("Giriş Başarısız");
          }
        })
      );
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css";
</style>

<style scoped>
#kapsayici {
  text-align: center;
  color: white;
  font-size: 18px;
}

.input-div {
  margin: auto;
  text-align: center;
  width: 30%;
}
</style>
