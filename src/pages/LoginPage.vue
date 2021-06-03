<template>
  <div id="kapsayici">
    <input v-model="kullanici_adi" placeholder="Kullanıcı Adı" />
    <input v-model="sifre" placeholder="Şifre" type="password" />
    <button @click="tiklama">Giriş Yap</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kullanici_adi: null,
      sifre: null,
    };
  },
  methods: {
    tiklama() {
      console.log(this.kullanici_adi + " - " + this.sifre);
    },
  },
  mounted() {},
  created() {},
};
</script>

<style scoped>
#kapsayici {
  text-align: center;
  color: white;
  font-size: 18px;
  display: list-item;
}
</style>
