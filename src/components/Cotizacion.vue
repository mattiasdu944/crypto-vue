<script setup lang='ts'>
import { ICotizacion } from '../interfaces';


    const props = defineProps<{
        cotizacion: ICotizacion;
    }>();

    const { cotizacion } = props;

</script>

<template>
    <div class="contenedor-resultado">
        <h2>Cotizacion</h2>
        <div class="resultado">
            <img 
                :src="`https://cryptocompare.com${ cotizacion.IMAGEURL }`" 
                alt="Imagen"
            > 
            <div>
                <p>El precio es de: <span>{{  cotizacion.PRICE  }}</span></p>
                <p>Precio mas alto del dia: <span>{{  cotizacion.HIGHDAY  }}</span></p>
                <p>Precio mas bajo del dia: <span>{{  cotizacion.LOWDAY  }}</span></p>
                <p>Varización ultimas 24h: <span>{{  cotizacion.CHANGEPCT24HOUR  }}%</span></p>
                <p>Ultima actualizacióm: <span>{{  cotizacion.LASTUPDATE  }}</span></p>
            </div>

        </div>
    </div>
</template>
