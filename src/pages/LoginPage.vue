<template>
  <div id="kapsayici">
    <input placeholder="Kullanıcı Adı" />
    <input placeholder="Şifre" type="password" />
    <button></button>
  </div>
</template>
<script>
export default {
  data: {},
  methods: {
    tiklama() {
      console.log("Deneme");
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
}
</style>
