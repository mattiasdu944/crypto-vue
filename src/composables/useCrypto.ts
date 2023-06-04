import { computed, onMounted, ref } from "vue";
import cryptoApi from "../api/cryptoApi";

import { ICotizacion, ICrypto } from "../interfaces";

export const useCrypto = () => {
    const cryptos = ref<ICrypto[]>([] as ICrypto[]);
    const isLoading = ref( false ); 
    const cotizacion = ref<ICotizacion>({} as ICotizacion);

    onMounted(async () => {
        const { data: { Data } } = await cryptoApi.get('/top/mktcapfull', { 
            params: {
                'limit':20,
                'tsym' :'USD'
            }
        });
        cryptos.value = Data;
    });

    const cotizarCrypto = async ( cotizar: { moneda: string,crypto: string } ) => {
        isLoading.value = true
        const { crypto, moneda } = cotizar
        const { data } = await cryptoApi.get<any>('/pricemultifull',{
            params:{
                fsyms:cotizar.crypto,
                tsyms:cotizar.moneda,
            }
        })

        cotizacion.value = data.DISPLAY[crypto][moneda];
        isLoading.value = false
    }

    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0;
    })


    return {
        cryptos,
        isLoading,
        cotizacion,
        cotizarCrypto,
        mostrarResultado
    }
}
