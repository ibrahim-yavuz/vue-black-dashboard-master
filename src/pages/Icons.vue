<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">Sipariş Ver</h5>
      <p class="category">Bu kısımdan sipariş verebilirsiniz!</p>
    </div>
    <div class="card-body all-icons">
      <div class="row">
        
        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="cikolatali" />
          </div>
        </div>

        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="cilekli" />
          </div>
        </div>

        <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          <div class="font-icon-detail">
            <img :src="muzlu" />
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
      muzlu: muzlu
    }    
  }
};
</script>
<style>
</style>
