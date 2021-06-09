import Urunler from "./urunler.js"
export default {
  gerekli_urunler: {
    sut: ["stok"],
    yumurta: ["stok"],
    renklendirici: ["stok"],
    seker: ["stok"],
    cikolata_aromasi: ["stok"],
    cilek_aromasi: ["stok"],
    muz_aromasi: ["stok"],
    kaymak: [1],
    yogunlastirilmis_sut: [5,6,7],
    pastorize_karisim: [8],
    cikolata_aromali_karisim: [9, 10, 11],
    cilek_aromali_karisim: [9, 10, 12],
    muz_aromali_karisim: [9, 10, 13],
    paketlenmemis_cikolatali_dondurma: [14],
    paketlenmemis_cilekli_dondurma: [15],
    paketlenmemis_muzlu_dondurma: [16],
    cikolatali_dondurma: [17],
    cilekli_dondurma: [18],
    muzlu_dondurma: [19],
  },

  altUrunBul(id) {
    switch (id) {
      case 1:
        return this.gerekli_urunler.sut;
        break;
      case 5:
        return this.gerekli_urunler.kaymak;
        break;
      case 6:
        return this.gerekli_urunler.seker;
        break;
      case 7:
        return this.gerekli_urunler.yumurta;
        break;
      case 8:
        return this.gerekli_urunler.yogunlastirilmis_sut;
        break;
      case 9:
        return this.gerekli_urunler.pastorize_karisim;
        break;
      case 10:
        return this.gerekli_urunler.renklendirici;
        break;
      case 11:
        return this.gerekli_urunler.cikolata_aromasi;
        break;
      case 12:
        return this.gerekli_urunler.cilek_aromasi;
        break;
      case 13:
        return this.gerekli_urunler.muz_aromasi;
        break;
      case 14:
        return this.gerekli_urunler.cikolata_aromali_karisim;
        break;
      case 15:
        return this.gerekli_urunler.cilek_aromali_karisim;
        break;
      case 16:
        return this.gerekli_urunler.muz_aromali_karisim;
        break;
      case 17:
        return this.gerekli_urunler.paketlenmemis_cikolatali_dondurma;
        break;
      case 18:
        return this.gerekli_urunler.paketlenmemis_cilekli_dondurma;
        break;
      case 19:
        return this.gerekli_urunler.paketlenmemis_muzlu_dondurma;
        break;
      case 20:
        return this.gerekli_urunler.cikolatali_dondurma;
        break;
      case 21:
        return this.gerekli_urunler.cilekli_dondurma;
        break;
      case 22:
        return this.gerekli_urunler.muzlu_dondurma;
        break;

    }
  },
}








/*
getUrun(id){
        let urun_ismi = null;
        switch(id){
            case Urunler.YOGUNLASTIRILMIS_SUT:
                urun_ismi = Urunler.SUT + "-" + Urunler.YUMURTA + "-" + Urunler.SEKER
                break;
            case Urunler.PASTORIZE_KARISIM:
                urun_ismi = "sut";
                break;
            case Urunler.RENKLENDIRICI:
                urun_ismi = "sut";
                break;
            case Urunler.CIKOLATA_AROMASI:
                urun_ismi = "sut";
                break;
            case Urunler.CILEK_AROMASI:
                urun_ismi = "sut";
                break;
            case Urunler.MUZ_AROMASI:
                urun_ismi = "sut";
                break;
            case Urunler.CIKOLATA_AROMALI_KARISIM:
                urun_ismi = "sut";
                break;
            case Urunler.CILEK_AROMALI_KARISIM:
                urun_ismi = "sut";
                break;
            case Urunler.MUZ_AROMALI_KARISIM:
                urun_ismi = "sut";
                break;
            case Urunler.PAKETLENMEMIS_CIKOLATALI_DONDURMA:
                urun_ismi = "sut";
                break;
            case Urunler.PAKETLENMEMIS_CILEKLI_DONDURMA:
                urun_ismi = "sut";
                break;
            case Urunler.PAKETLENMEMIS_MUZLU_DONDURMA:
                urun_ismi = "sut";
                break;
            case Urunler.CIKOLATALI_DONDURMA:
                urun_ismi = "sut";
                break;
            case Urunler.CILEKLI_DONDURMA:
                urun_ismi = "sut";
                break;
            case Urunler.MUZLU_DONDURMA:
                urun_ismi = "sut";
                break;
            
        }

        return urun_ismi;
    }*/
