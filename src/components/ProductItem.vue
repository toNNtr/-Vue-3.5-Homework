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
            :colors="productColors"
        />
    </div>
</template>

<script>
    import goToPage from "@/helpers/goToPage.js";
    import numberFormat from "@/helpers/numberFormat.js";

    import BaseColors from "@/components/BaseColors.vue";

    export default {
        props: ["product"],
        components: {
            BaseColors
        },
        data() {
            return {
                currentColorID: null
            };
        },
        computed: {
            productColors() {
                    return this.product.colors;
            }
        },
        filters: {
            numberFormat
        },
        methods: {
            goToPage
        },
        mounted() {
            if(this.productColors.length) {
                this.currentColorID = this.productColors[0].id;
            }
        }
    }
</script>