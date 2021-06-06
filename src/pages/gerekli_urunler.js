import Urunler from "./urunler.js"
export default{
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
    }

}