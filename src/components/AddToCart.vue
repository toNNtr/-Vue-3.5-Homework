<template>
<div class="item__form">
                    <form class="form"
                        @submit.prevent="addToCart"
                    >
                        <b class="item__price">
                            {{ product.price | numberFormat }}
                        </b>

                        <fieldset class="form__block">
                            <legend class="form__legend">Цвет:</legend>
                            <BaseColors
                                v-model="currentColorID"
                                :colors="colors"
                            />
                        </fieldset>

                        <fieldset class="form__block">
                            <legend class="form__legend">Объемб в ГБ:</legend>

                            <ul class="sizes sizes--primery">
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                                        <span class="sizes__value">
                                            32gb
                                        </span>
                                    </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                                        <span class="sizes__value">
                                            64gb
                                        </span>
                                    </label>
                                </li>
                                <li class="sizes__item">
                                    <label class="sizes__label">
                                        <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                                            checked="">
                                        <span class="sizes__value">
                                            128gb
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </fieldset>

                        <div class="item__row">
                            <InputNumber
                                :min="1"
                                :max="100"
                                v-model.number="amount"
                            />

                            <button class="button button--primery" type="submit">
                                В корзину
                            </button>
                        </div>
                    </form>
                </div>
</template>

<script>
import products from "@/data/products.js";
import colors from "@/data/colors.js";
import BaseColors from "@/components/BaseColors.vue";
import InputNumber from "@/components/InputNumber.vue";

import numberFormat from "@/helpers/numberFormat.js";

export default {
    components: {
        BaseColors,
        InputNumber,
    },
    props: ["productId"],
    data() {
        return {
            currentColorID: null,
            amount: 1
        }
    },
    methods: {
        addToCart() {
            this.$store.commit("addProductToCart", {
                productID: this.product.id,
                amount: this.amount
            });
        }
    },
    computed: {
        product() {
            return products.find(product => product.id == Number(this.productId));
        },
        colors() {
            return colors.filter(color => this.product.colors.find(productColorID => productColorID == color.id));
        }
    },
    filters: {
        numberFormat
    },
    created() {
        this.currentColorID = this.product.colors[0];
    }
}
</script>