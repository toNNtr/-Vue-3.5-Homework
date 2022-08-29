<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img width="120" height="120"
                :src="cartProduct.product.image"
                :alt="cartProduct.product.title"
            >
        </div>
        <h3 class="product__title">
            {{ cartProduct.product.title }}
        </h3>
        <!-- <p class="product__info">
            Объем: <span>128GB</span>
        </p> -->
        <span class="product__code">
            Артикул: {{ cartProduct.productID }}
        </span>

        <InputNumber
            :min="1"
            v-model.number="amount"
        />

        <b class="product__price">
            {{ cartProduct.product.price * cartProduct.amount | numberFormat }} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct(cartProduct.productID)"
        >
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>
import {
    mapMutations
} from "vuex";
import InputNumber from "@/components/InputNumber.vue";

import numberFormat from "@/helpers/numberFormat.js";
export default {
    props: ["cartProduct"],
    components: {
        InputNumber
    },
    filters: {
        numberFormat
    },
    methods: {
        ...mapMutations({
            deleteProduct: "deleteCartProduct"
        })
    },
    computed: {
        amount: {
            get() {
                return this.cartProduct.amount;
            },
            set(newValue) {
                this.$store.commit("updateCartProductAmount", {
                    productID: this.cartProduct.productID,
                    amount: newValue
                });
            }
        }
    }
}
</script>