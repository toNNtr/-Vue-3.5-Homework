<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link"
                        :to="{ name: 'main' }"
                    >
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Корзина
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                {{ cartProductsAmount }} {{ numWords(cartProductsAmount, ["товар", "товара", "товаров"]) }}
            </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <div 
                        v-if="isCartLoading"
                    >Загрузка товаров...</div>
                    <ul class="cart__list"
                        v-else
                    >
                        <CartItem
                            v-for="cartProduct in cartProducts"
                            :key="cartProduct.productID"
                            :cart-product="cartProduct"
                        />
                    </ul>
                </div>

                <div class="cart__block">
                    <p class="cart__desc">
                        Мы посчитаем стоимость доставки на следующем этапе
                    </p>
                    <p class="cart__price">
                        Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
                    </p>

                    <router-link tag="button" :disabled="cartProductsAmount == 0" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </router-link>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
    import numberFormat from "@/helpers/numberFormat.js";
    import numWords from "@/helpers/numWords.js";

    import CartItem from "@/components/CartItem.vue";

    import { mapGetters } from "vuex";

    export default {
        components: {
            CartItem
        },
        filters: {
            numberFormat
        },
        methods: {
            numWords
        },
        computed: {
            ...mapGetters({
                cartProducts: "cartDetailProducts",
                totalPrice: "totalCartPrice",
                cartProductsAmount: "cartProductsAmount",
                isCartLoading: "isCartLoading"
            })
        }
    }
</script>