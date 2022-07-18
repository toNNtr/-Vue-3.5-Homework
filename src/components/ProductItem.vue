<template>
    <div>
        <a class="catalog__pic" href="#"
            @click.prevent="goToPage('product', {id: product.id})"
        >
            <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
            <a href="#"
                @click.prevent="goToPage('product', {id: product.id})"
            >
                {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat }} ₽
        </span>

        <BaseColors class="colors--black"
            v-model="currentColorID"
            :colors="product.colors"
        />
    </div>
</template>

<script>
import goToPage from "@/helpers/goToPage.js";
import numberFormat from "@/helpers/numberFormat.js";

import BaseColors from "@/components/BaseColors.vue";

export default {
    props: [
        "product"
    ],
    components: {
        BaseColors
    },
    data() {
        return {
            currentColorID: this.product.colors[0]
        };
    },
    filters: {
        numberFormat
    },
    methods: {
        goToPage
    }
}
</script>