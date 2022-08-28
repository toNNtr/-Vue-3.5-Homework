<template>
    <div>
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}"
        >
            <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
            <router-link :to="{name: 'product', params: {id: product.id}}"
            >
                {{ product.title }}
            </router-link>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat }} ₽
        </span>

        <BaseColors class="colors--black"
            v-model="currentColorID"
            :colors="colors"
        />
    </div>
</template>

<script>
import colors from "@/data/colors.js";
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
    computed: {
        colors() {
            return colors.filter(color => this.product.colors.find(productColorID => productColorID == color.id));
        }
    },
    filters: {
        numberFormat
    },
    methods: {
        goToPage
    }
}
</script>