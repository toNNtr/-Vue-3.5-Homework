<template>
    <main class="content container" style="display: flex; justify-content: center; align-items: center; height: 100%;"
        v-if="!orderInfo"
    >
        <img src="@/assets/spinner.gif" alt="">
    </main>
    <main class="content container"
        v-else
    >
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="index.html">
                        Каталог
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="cart.html">
                        Корзина
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Оформление заказа
                    </a>
                </li>
            </ul>
            
            <h1 class="content__title">
                Заказ оформлен <span>№ {{ orderInfo.id }}</span>
            </h1>
        </div>
        
        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <p class="cart__message">
                        Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
                        Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
                    </p>
                    
                    <ul class="dictionary">
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Получатель
                            </span>
                            <span class="dictionary__value">
                                {{ orderInfo.name }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Адрес доставки
                            </span>
                            <span class="dictionary__value">
                                {{ orderInfo.address }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Телефон
                            </span>
                            <span class="dictionary__value">
                                {{ orderInfo.phone }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Email
                            </span>
                            <span class="dictionary__value">
                                {{ orderInfo.email }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Способ оплаты
                            </span>
                            <span class="dictionary__value">
                                картой при получении
                            </span>
                        </li>
                    </ul>
                </div>
                
                <div class="cart__block">
                    <CartOrders :products="orderInfo.basket.items" :amount="orderInfo.amount" :total-price="orderInfo.totalPrice" />
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import CartOrders from '@/components/CartOrders.vue';

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    components: {
        CartOrders
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            orderInfoGetter: "orderInfo"
        }),
        orderInfo() {
            return this.orderInfoGetter(this.$route.params.id);
        }
    },
    methods: {
        ...mapActions({
            loadOrderInfo: "loadOrderInfo"
        })
    },
    created() {
        if (!this.orderInfo) {
            this.loadOrderInfo(this.$route.params.id);
        }
    }
}
</script>