<template>
  <div id="kapsayici" class="col-md-12">
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
      <v-btn
        @click="tiklamaMusteri"
        class="ma-2 btn"
        tile
        color="secondary"
        dark
      >
        <v-icon left>mdi-login</v-icon>
        Müşteri Olarak Giriş Yap
      </v-btn>

      <v-btn @click="tiklamaSatici" class="ma-2 btn" tile color="indigo" dark>
        <v-icon left>mdi-login</v-icon>
        Satıcı Olarak Giriş Yap
      </v-btn>
      <v-btn @click="uyeOl" class="ma-2 btn" tile color="indigo" dark>
        <v-icon left>mdi-account-plus</v-icon>
        Üye Ol
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
    tiklamaMusteri() {
      let sayac = 0;
      let bulunduMu = false;
      this.$axios
        .get("http://localhost:8000/customers/", {
          mode: "no-cors",
        })
        .then((response) =>
          response.data.forEach((element) => {
            sayac++;
            if (
              this.kullanici_adi == element["name"] &&
              this.sifre == element["password"]
            ) {
              bulunduMu = true;
              localStorage.setItem("user_type", "customer");
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

    tiklamaSatici() {
      let sayac = 0;
      let bulunduMu = false;
      this.$axios
        .get("http://localhost:8000/users/", {
          mode: "no-cors",
        })
        .then((response) =>
          response.data.forEach((element) => {
            sayac++;
            if (
              this.kullanici_adi == element["name"] &&
              this.sifre == element["password"]
            ) {
              bulunduMu = true;
              localStorage.setItem("user_type", "user");
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

    uyeOl() {
      this.$axios
        .post(
          "http://127.0.0.1:8000/customers/",
          {
            name: this.kullanici_adi,
            password: this.sifre,
          },
          {
            mode: "no-cors",
          }
        )
        .then((response) => console.log(response.data));
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
