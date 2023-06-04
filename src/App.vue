<script setup lang='ts'>
import {  ref, reactive } from 'vue';
import { monedas } from "./constants";


import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import Cotizacion from "./components/Cotizacion.vue";
import { useCrypto } from "./composables";

    const { cryptos, cotizacion, isLoading, cotizarCrypto, mostrarResultado } = useCrypto();
    
    const isError = ref('');
    const cotizar = reactive({
        moneda: '',
        crypto: '',
    });

    const getCryptoValue = () => {
        if( Object.values( cotizar ).includes('') ){
            isError.value = 'Todos los campos son obligatorios'
            return;
        }

        cotizarCrypto( cotizar );
        isError.value = '';
    }


</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Cotizador de <span>Cryptomonedas</span></h1>
        <div class="contenido">
            <form 
                class="formulario"
                @submit.prevent="getCryptoValue"
            >
            
                <Alert
                    v-if="isError"
                >{{  isError  }}</Alert>
                <!-- MONEDAS -->
                <div class="campo">
                    <label for="moneda">Modeda: </label>
                    <select id="moneda" v-model="cotizar.moneda">
                        <option value="">---Secciona---</option>
                        <option 
                            v-for="moneda in monedas" 
                            :value="moneda.codigo"
                        >
                            {{  moneda.texto  }}
                        </option>
                    </select>
                </div>

                <!-- CRYPTOMONEDAS -->
                <div class="campo">
                    <label for="crypto">CrytoModeda: </label>
                    <select id="crypto" v-model="cotizar.crypto">
                        <option value="">---Secciona---</option>
                        <option 
                            v-for="crypto in cryptos" 
                            :value="crypto.CoinInfo.Name"
                        >
                            {{  crypto.CoinInfo.FullName  }}
                        </option>
                    </select>
                </div>
                <input type="submit" value="cotizar">
            </form>

            <Spinner v-if="isLoading"/>
            
            <Cotizacion
                :cotizacion="cotizacion"
                v-if="mostrarResultado && !isLoading"
            />

        </div>

    </div>
</template>