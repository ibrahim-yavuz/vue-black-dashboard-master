<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Sipariş Ver</h5>
      <p class="category">
        Burada seçtiğiniz türdeki dondurmanın siparişini verebilirsiniz.
        Siparişlerimizde en erken teslim tarihi 7 gündür. İsteğe bağlı son
        teslim tarihini değiştirebilirsiniz.
      </p>
      <p class="category">
        Tek yapmanız gereken sipariş vermek istediğiniz dondurmanın altına adeti
        girdikten sonra son teslim tarihide isteğe "Satın Al" butonuna
        tıklamanız!
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
              min="900"
              step="900"
              v-model="cilekli_adet"
              placeholder="Alınacak Adet"
            />
            <button type="submit" @click="cilekliAl">Satın Al</button>
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
              min="900"
              step="900"
              v-model="muzlu_adet"
              placeholder="Alınacak Adet"
            />
            <button type="submit" @click="muzluAl">Satın Al</button>
          </div>
        </div>
        <div
          class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
        >
          <div class="font-icon-detail">
            <img :src="yakinda" />
            <p>Yeni ürünlerimiz çok yakında</p>
          </div>
        </div>
        <div
          class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
        >
          <div class="font-icon-detail">
            <img :src="yakinda" />
            <p>Yeni ürünlerimiz çok yakında</p>
          </div>
        </div>
      </div>

      <div class="font-icon-detail">
        <p class="category">Son Teslim Tarihini Seçiniz</p>
        <input type="date" v-model="mydate" :min="myenddate" />
      </div>
    </div>
  </div>
</template>
<script>
import cikolatali from "./icons/cikolatali_dondurma.png";
import cilekli from "./icons/cilekli_dondurma.png";
import muzlu from "./icons/muzlu_dondurma.png";
import yakinda from "./icons/yakinda.png";
import Urunler from "./urunler.js";
export default {
  data: function() {
    return {
      order2: {
        customer_id: null,
        order_date: null,
        deadline: null
      },
      orderitems2: {
        order_id: null,
        product_id: null,
        amount: null
      },
      cikolatali: cikolatali,
      cilekli: cilekli,
      muzlu: muzlu,
      yakinda: yakinda,
      cikolatali_adet: 0,
      cilekli_adet: 0,
      muzlu_adet: 0,
      mydate: "2021-6-16",
      myenddate: "2022-2-22",
      value: null
    };
  },

  methods: {
    cikolataliAl() {
      if (this.cikolatali_adet >= 900 && this.cikolatali_adet < 90000) {
        this.order2.customer_id = "31";
        this.order2.order_date = this.currentDateTime();
        this.order2.deadline = this.mydate;

        this.orderitems2.product_id = Urunler.CIKOLATALI_DONDURMA;
        this.orderitems2.amount = this.cikolatali_adet;

        this.$axios
          .post("http://127.0.0.1:8000/orders/", this.order2, {
            mode: "no-cors"
          })
          .then(response => {
            this.$axios.get("http://127.0.0.1:8000/orders/").then(response => {
              this.value = response.data[response.data.length - 1];
              this.orderitems2.order_id = this.value.order_id;
              this.$axios.post(
                "http://127.0.0.1:8000/orderitems/",
                this.orderitems2,
                { mode: "no-cors" }
              );
            });
          });

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
      if (this.cilekli_adet >= 900 && this.cilekli_adet < 90000) {
        this.order2.customer_id = "61";
        this.order2.order_date = this.currentDateTime();
        this.order2.deadline = this.mydate;

        this.orderitems2.product_id = Urunler.CILEKLI_DONDURMA;
        this.orderitems2.amount = this.cilekli_adet;

        this.$axios
          .post("http://127.0.0.1:8000/orders/", this.order2, {
            mode: "no-cors"
          })
          .then(response => {
            this.$axios.get("http://127.0.0.1:8000/orders/").then(response => {
              this.value = response.data[response.data.length - 1];
              this.orderitems2.order_id = this.value.order_id;
              this.$axios.post(
                "http://127.0.0.1:8000/orderitems/",
                this.orderitems2,
                { mode: "no-cors" }
              );
            });
          });

        this.$alert("Siparişiniz Alınmıştır.");
      } else if (this.cilekli_adet < 900) {
        this.$alert("Sipariş Alınamadı. Minumum Sipariş Adetimiz 900'dür.");
      } else if (this.cilekli_adet > 90000) {
        this.$alert("Sipariş Alınamadı. Maximum Sipariş Adetimiz 90000'dür.");
      } else {
        this.$alert("Sipariş Alınamadı. Lütfen Geçerli Bir Adet Giriniz.");
      }
    },
    muzluAl() {
      if (this.muzlu_adet >= 900 && this.muzlu_adet < 90000) {
        this.order2.customer_id = "71";
        this.order2.order_date = this.currentDateTime();
        this.order2.deadline = this.mydate;

        this.orderitems2.product_id = Urunler.MUZLU_DONDURMA;
        this.orderitems2.amount = this.muzlu_adet;

        this.$axios
          .post("http://127.0.0.1:8000/orders/", this.order2, {
            mode: "no-cors"
          })
          .then(response => {
            this.$axios.get("http://127.0.0.1:8000/orders/").then(response => {
              this.value = response.data[response.data.length - 1];
              this.orderitems2.order_id = this.value.order_id;
              this.$axios.post(
                "http://127.0.0.1:8000/orderitems/",
                this.orderitems2,
                { mode: "no-cors" }
              );
            });
          });

        this.$alert("Siparişiniz Alınmıştır.");
      } else if (this.muzlu_adet < 900) {
        this.$alert("Sipariş Alınamadı. Minumum Sipariş Adetimiz 900'dür.");
      } else if (this.muzlu_adet > 90000) {
        this.$alert("Sipariş Alınamadı. Maximum Sipariş Adetimiz 90000'dür.");
      } else {
        this.$alert("Sipariş Alınamadı. Lütfen Geçerli Bir Adet Giriniz.");
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
    },
    getUnits: function() {
      this.mydate = this.DeadDateTime();
      this.myenddate = this.DeadDateTime();
    }
  },
  beforeMount() {
    this.getUnits();
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
