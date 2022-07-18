<template>
    <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
            <fieldset class="form__block">
                <legend class="form__legend">Цена</legend>
                <label class="form__label form__label--price">
                    <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice">
                    <span class="form__value">От</span>
                </label>
                <label class="form__label form__label--price">
                    <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice">
                    <span class="form__value">До</span>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Категория</legend>
                <label class="form__label form__label--select">
                    <select class="form__select" type="text" name="category" v-model="currentCategoryID">
                        <option value="null">Все категории</option>
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.title }}
                        </option>
                    </select>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <BaseColors show-clear
                    v-model="currentColorID"
                    :colors="colors"
                />
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Объем в ГБ</legend>
                <ul class="check-list">
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                            <span class="check-list__desc">
                                8
                                <span>(313)</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                            <span class="check-list__desc">
                                16
                                <span>(461)</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                            <span class="check-list__desc">
                                32
                                <span>(313)</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                            <span class="check-list__desc">
                                64
                                <span>(313)</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                            <span class="check-list__desc">
                                128
                                <span>(313)</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                            <span class="check-list__desc">
                                264
                                <span>(313)</span>
                            </span>
                        </label>
                    </li>
                </ul>
            </fieldset>
            <button class="filter__submit button button--primery" type="submit">
                Применить
            </button>
            <button class="filter__reset button button--second" type="submit" @click.prevent="clear">
                Сбросить
            </button>
        </form>
    </aside>
</template>


<script>
import categories from "../data/categories.js";
import colors from "../data/colors.js";

import BaseColors from "@/components/BaseColors.vue";

export default {
    props: ["minPrice", "maxPrice", "categoryId", "colorId"],
    components: {
        BaseColors
    },
    data() {
        return {
            currentMinPrice: this.minPrice,
            currentMaxPrice: this.maxPrice,
            currentCategoryID: this.categoryId,
            currentColorID: this.colorId,
        };
    },
    computed: {
        categories() {
            return categories;
        },
        colors() {
            return colors.map(color => color.id);
        }
    },
    watch: {
        minPrice(value) {
            this.currentMinPrice = value;
        },
        maxPrice(value) {
            this.currentMaxPrice = value;
        },
        categoryId(value) {
            this.currentCategoryID = value;
        },
        colorId(value) {
            this.currentColorID = value;
        }
    },
    methods: {
        submit() {
            this.$emit("update:minPrice", this.currentMinPrice);
            this.$emit("update:maxPrice", this.currentMaxPrice);
            this.$emit("update:categoryId", this.currentCategoryID);
            this.$emit("update:colorId", this.currentColorID);
        },
        clear() {
            this.$emit("update:minPrice", 0);
            this.$emit("update:maxPrice", 0);
            this.$emit("update:categoryId", null);
            this.$emit("update:colorId", null);
        }
    }
}
</script>