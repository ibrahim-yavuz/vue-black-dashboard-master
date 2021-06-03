<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Sipariş Ver</h5>
      <p class="category">
        Burada seçtiğiniz türdeki dondurmanın siparişini verebilirsiniz.Tek
        yapmanız gereken sipariş vermek istediğiniz dondurmanın altına adeti
        girdikten sonra "Satın Al" butonuna tıklamanız!
      </p>
      <p class="category">
        Bilgilendirme: Firmamızın sipariş miktarı minumum 900, maximum
        90.000'dir.
      </p>
    </div>
    <div class="card-body all-icons">
      <div class="row">
        <div
          class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
        >
          <div class="font-icon-detail">
            <img :src="cikolatali" />
            <p>Çikolatalı Dondurma</p>
            <input
              type="number"
              min="900"
              step="900"
              v-model="cikolatali_adet"
              placeholder="Alınacak Adet"
            />
            <button type="submit" @click="cikolataliAl">Satın Al</button>
          </div>
        </div>

        <div
          class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
        >
          <div class="font-icon-detail">
            <img :src="cilekli" />
            <p>Çilekli Dondurma</p>
            <input
              type="number"
              min="0"
              v-model="cilekli_adet"
              placeholder="Alınacak Adet"
            />
            <button type="submit">Satın Al</button>
          </div>
        </div>

        <div
          class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
        >
          <div class="font-icon-detail">
            <img :src="muzlu" />
            <p>Muzlu Dondurma</p>
            <input
              type="number"
              min="0"
              v-model="muzlu_adet"
              placeholder="Alınacak Adet"
            />
            <button type="submit">Satın Al</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cikolatali from "./icons/cikolatali_dondurma.png";
import cilekli from "./icons/cilekli_dondurma.png";
import muzlu from "./icons/muzlu_dondurma.png";
export default {
  data: function() {
    return {
      order2: {
        customer_id2: null,
        order_date2: null,
        deadline2: null
      },
      cikolatali: cikolatali,
      cilekli: cilekli,
      muzlu: muzlu,
      cikolatali_adet: 0,
      cilekli_adet: 0,
      muzlu_adet: 0
    };
  },
  methods: {
    cikolataliAl() {
      if (this.cikolatali_adet >= 900 && this.cikolatali_adet < 90000) {
        this.order2.customer_id2 = "8";
        this.order2.order_date2 = this.currentDateTime();
        this.order2.deadline2 = this.DeadDateTime();
        console.log(this.order2);
        this.$axios.post(
          "http://127.0.0.1:8000/orders/",
          { mode: "no-cors" },
          this.order2
        );
        //.then(result => {
        //  console.log(result);
        //});
        this.$alert("Siparişiniz Alınmıştır.");
      } else if (this.cikolatali_adet < 900) {
        this.$alert("Sipariş Alınamadı. Minumum Sipariş Adetimiz 900'dür.");
      } else if (this.cikolatali_adet > 90000) {
        this.$alert("Sipariş Alınamadı. Maximum Sipariş Adetimiz 90000'dür.");
      } else {
        this.$alert("Sipariş Alınamadı. Lütfen Geçerli Bir Adet Giriniz.");
      }
    },
    cilekliAl() {
      if (this.cilekli_adet > 0) {
      }
    },
    muzluAl() {
      if (this.muzlu_adet > 0) {
      }
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
    DeadDateTime() {
      const current = new Date();
      const day0 =
        current.getDate() + 7 < 10
          ? "0" + (current.getDate() + 7)
          : current.getDate() + 7;

      const month0 =
        current.getMonth() + 1 < 10
          ? "0" + (current.getMonth() + 1)
          : current.getMonth() + 1;

      const date = current.getFullYear() + "-" + month0 + "-" + day0;

      const dateTime = date;

      return dateTime;
    }
  }
};
</script>
<style scoped>
input {
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  outline-width: 0px;
  width: 80%;
  text-align: center;
}

button {
  outline: none;
  margin-top: 10px;
  border: none;
  border-radius: 2px;
  outline: none;
  padding: 10px;
  width: 80%;
  background-color: #1e1e2f;
  color: white;
  cursor: pointer;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #17172c;
}

button:active {
  background-color: #0a0a2b;
}
</style>
