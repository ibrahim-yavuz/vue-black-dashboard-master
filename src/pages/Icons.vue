<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Sipariş Ver</h5>
      <p class="category">Sipariş ver lo!</p>
    </div>
    <div class="card-body all-icons">
      <div class="row">
        
        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="cikolatali" />
            <p>Çikolatalı Dondurma</p>
            <input type="number" min="0" v-model="cikolatali_adet" placeholder="Alınacak Adet"/>
            <button type="submit" @click="cikolataliAl">Satın Al</button>
          </div>
        </div>

        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="cilekli" />
            <p>Çilekli Dondurma</p>
            <input type="number" min="0" v-model="cilekli_adet" placeholder="Alınacak Adet"/>
            <button type="submit" >Satın Al</button>
          </div>
        </div>

        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="muzlu" />
            <p>Muzlu Dondurma</p>
            <input type="number" min="0" v-model="muzlu_adet" placeholder="Alınacak Adet"/>
            <button type="submit" >Satın Al</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import cikolatali from "./icons/cikolatali_dondurma.png"
import cilekli from "./icons/cilekli_dondurma.png"
import muzlu from "./icons/muzlu_dondurma.png"
export default {
  data: function () {
    return{
      cikolatali: cikolatali,
      cilekli: cilekli,
      muzlu: muzlu,
      cikolatali_adet: 0,
      cilekli_adet: 0,
      muzlu_adet: 0,
    }    
  },
  methods: {
    cikolataliAl(){
      if(this.cikolatali_adet > 0){
        
      }else{
        this.$alert("Selamun Aleyküm")
      }
    },
    cilekliAl(){
      if(this.cilekli_adet > 0){

      }
    },
    muzluAl(){
      if(this.muzlu_adet > 0){

      }
    }
  }
};
</script>
<style>

input{
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  outline-width: 0px;
  width: 80%;
  text-align: center;
}

button{
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

button:focus{
  outline: none;
}

button:hover {
  background-color: #17172c;
}

button:active{
  background-color: #0a0a2b;
}

</style>
