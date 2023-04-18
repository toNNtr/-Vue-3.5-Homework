<template>
    <div class="">
        <div v-if="!products">Загрузка товаров...</div>
        <ul v-else class="cart__orders">
            <li v-for="cartProduct in products" :key="cartProduct.product.id" class="cart__order">
                <h3>{{ cartProduct.product.title }}</h3>
                <b>{{ cartProduct.product.price | numberFormat }} ₽</b>
                <span>Артикул: {{ cartProduct.product.id }}</span>
            </li>
        </ul>
        <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ amount }}</b> товаров на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
        </div>
    </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat.js";

export default {
    props: ["products", "amount", "total-price"],
    filters: {
        numberFormat
    }
}
</script>