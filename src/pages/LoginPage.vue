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
      <v-btn @click="tiklama" class="ma-2 btn" tile color="secondary" dark>
        <v-icon left>mdi-login</v-icon>
        Müşteri Olarak Giriş Yap
      </v-btn>

      <v-btn @click="tiklama" class="ma-2 btn" tile color="indigo" dark>
        <v-icon left>mdi-login</v-icon>
        Satıcı Olarak Giriş Yap
      </v-btn>
    </div>
  </div>
</template>
<script>
import vuetify from "@/plugins/vuetify";
export default {
  data() {
    return {
      aktif_kullanici_id: {},
      kullanici_adi: null,
      sifre: null,
      is_logged_in: false,
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
            localStorage.setItem("current_user", JSON.stringify(element));
            this.aktif_kullanici_id = JSON.parse(
              localStorage.getItem("current_user")
            );

            this.$router.push({ name: "dashboard" });
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
  width: 100%;
}

.btn {
  margin-left: 10px;
  margin-right: 10px;
}

.input-div {
  margin: auto;
  text-align: center;
  width: 30%;
}
</style>
