<template>
    <router-link class="header__cart" aria-label="Корзина с товарами"
        :to="{ name: 'cart' }"
    >
        <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
        </svg>
        <div class="header__count loader"
            v-if="isCartLoading"
        ></div>
        <span class="header__count" aria-label="Количество товаров"
            v-else
        >{{ amount }}</span>
    </router-link> 
</template>

<style>
    .loader {
        width: 100%;
        height: 100%;

        background-image: url("/img/loader.gif");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

    .header__count.loader {
        width: 18px;
        height: 18px;
        background-color: transparent;
    }
</style>

<script>
    import { mapGetters } from "vuex";

    export default {
        computed: {
            ...mapGetters({
                isCartLoading: "isCartLoading"
            }),
            amount() {
                return this.$store.getters.cartProductsAmount;
            }
        }
    }
</script>