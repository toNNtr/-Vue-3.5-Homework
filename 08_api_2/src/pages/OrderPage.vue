<template>
    <main class="content container">
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
                Корзина
            </h1>
            <span class="content__info">
                3 товара
            </span>
        </div>
        
        <section class="cart">
            <form class="cart__form form" action="#" method="POST" @submit.prevent="submitOrder">
                <div class="cart__field">
                    <div class="cart__data">
                        
                        <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>
                        
                        <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"/>
                        
                        <BaseFormText v-model="formData.phone" :error="formError.phone" type="tel" title="Телефон" placeholder="Введите ваш телефон"/>
                        
                        <BaseFormText v-model="formData.email" :error="formError.email" type="email" title="Email" placeholder="Введи ваш Email"/>
                        
                        <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу" placeholder="Ваши пожелания"/>
                    </div>
                    
                    <div class="cart__options">
                        <h3 class="cart__title">Доставка</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                                    <span class="options__value">
                                        Самовывоз <b>бесплатно</b>
                                    </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                                    <span class="options__value">
                                        Курьером <b>500 ₽</b>
                                    </span>
                                </label>
                            </li>
                        </ul>
                        
                        <h3 class="cart__title">Оплата</h3>
                        <ul class="cart__options options">
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                                    <span class="options__value">
                                        Картой при получении
                                    </span>
                                </label>
                            </li>
                            <li class="options__item">
                                <label class="options__label">
                                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                                    <span class="options__value">
                                        Наличными при получении
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="cart__block">
                    <CartOrders :products="cartProducts" :amount="cartProductsAmount" :total-price="totalPrice" />
                    
                    <button :disabled="cartProductsAmount == 0 || isFormSending" class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </button>
                </div>
                <div class="" style="display: flex; justify-content: center;"
                    v-if="isFormSending"
                >
                    <img src="@/assets/spinner.gif" alt="">
                </div>
                <div class="cart__error form__error-block"
                    v-if="formErrorMessage"
                >
                    <h4>Заявка не отправлена!</h4>
                    <p>
                        {{ formErrorMessage }}
                    </p>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import BaseFormField from "@/components/BaseFormField.vue";
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CartOrders from "@/components/CartOrders.vue";

import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

import numberFormat from "@/helpers/numberFormat.js";

export default {
    components: {
        BaseFormField,
        BaseFormText,
        BaseFormTextarea,
        CartOrders
    },
    filters: {
        numberFormat
    },
    data() {
        return {
            formData: {},
            formError: {},
            formErrorMessage: null,
            isFormSending: false
        };
    },
    methods: {
        ...mapActions({
            sendOrder: "sendOrder"
        }),
        ...mapMutations({
            resetCart: "resetCart",
            updateOrderInfo: "updateOrderInfo"
        }),
        submitOrder() {
            this.formError = {};
            this.formErrorMessage  = null;
            this.isFormSending = true;

            this.sendOrder(this.formData)
            .then(result => {
                console.log(result);

                if(result.error) {
                    this.formError = result.error.request || {};
                    this.formErrorMessage = result.error.message;
                    this.isFormSending = false;

                    return;
                }

                this.resetCart();
                this.updateOrderInfo(result);
                this.$router.push({name: "orderInfo", params: {id: result.id}});
            });
        }
    },
    computed: {
        ...mapGetters({
            cartProducts: "cartDetailProducts",
            totalPrice: "totalCartPrice",
            cartProductsAmount: "cartProductsAmount"
        })
    }
}
</script>

<style>

</style>