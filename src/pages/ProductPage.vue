<template>
    <main class="content container"
        v-if="productLoading"
    >
        Загрузка товара...
    </main>
    <main class="content container"
        v-else-if="!product"
    >
        При загрузке товара произошла ошибка
    </main>
    <main class="content container"
        v-else
    >
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item"
                    v-if="category"
                >
                    <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
                        {{ category.title }}
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    {{ product.title }}
                </li>
            </ul>
        </div>

        <section class="item">
            <div class="item__pics pics">
                <div class="pics__wrapper">
                    <img width="570" height="570"
                        :src="product.image"
                        :alt="product.title"
                    >
                </div>
            </div>

            <div class="item__info">
                <span class="item__code">Артикул: {{ product.id }}</span>
                <h2 class="item__title">
                    {{ product.title }}
                </h2>
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
                            <legend class="form__legend">Объем в ГБ:</legend>

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

                            <button class="button button--primery" type="submit"
                                :disabled="addProductStatus == 'pending'"
                            >
                                В корзину
                            </button>
                        </div>
                        <div 
                            v-show="addProductStatus == 'done'"
                        >Товар добавлен в корзину</div>
                        <div 
                            v-show="addProductStatus == 'pending'"
                        >Добавление товара...</div>
                    </form>
                </div>
            </div>

            <div class="item__desc">
                <ul class="tabs">
                    <li class="tabs__item">
                        <a class="tabs__link tabs__link--current">
                            Описание
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Характеристики
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Гарантия
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" href="#">
                            Оплата и доставка
                        </a>
                    </li>
                </ul>

                <div class="item__content">
                    <p>
                        Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
                        Синхронизация со смартфоном<br>
                        Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
                        Поддержка сторонних приложений<br>
                    </p>

                    <a href="#">
                        Все характеристики
                    </a>

                    <h3>Что это?</h3>

                    <p>
                        Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
                        сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
                        объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на
                        смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и
                        различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
                        принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
                        маршруты и планировать новые велопрогулки.
                    </p>

                    <h3>Дизайн</h3>

                    <p>
                        Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x
                        47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного
                        пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей
                        выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков
                        информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект
                        поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что
                        устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду
                        на глубину не более 1 метра.
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import { mapActions } from "vuex";


    import numberFormat from "@/helpers/numberFormat.js";

    import InputNumber from "@/components/InputNumber.vue";
    import BaseColors from "@/components/BaseColors.vue";

    export default {
        components: {
            BaseColors,
            InputNumber
        },
        data() {
            return {
                currentColorID: null,
                amount: 1,
                productData: null,
                productLoading: false,
                productLoadingFailed: false,
                addProductStatus: ""
            };
        },
        methods: {
            ...mapActions({
                addProductToCart: "addProductToCart",
                loadProduct: "loadProduct"
            }),
            addToCart() {
                if(this.addProductStatus != "pending") {
                    this.addProductStatus = "pending";
                    this.addProductToCart({productID: this.product.id, amount: this.amount})
                    .then(() => {
                        this.addProductStatus = "done";
                    });
                }
            },
            loadProductData() {
                this.productLoading = true;

                this.loadProduct({productID: this.$route.params.id})
                .then(productData => {
                    this.productData = productData;
                })
                .catch(reason => {
                    this.productLoadingFailed = true;
                })
                .finally(() => {
                    this.productLoading = false;
                });
            }
        },
        computed: {
            product() {
                return this.productData ? {
                    ...this.productData,
                    image: this.productData.image.file.url
                } : null;
            },
            category() {
                return this.product ? this.product.category : null;
            },
            colors() {
                return this.product ? this.product.colors.map(color => {
                    return {
                        ...color,
                        value: color.code
                    };
                }) : [];
            }
        },
        filters: {
            numberFormat
        },
        watch: {
            "$route.params.id": {
                handler() {
                    this.loadProductData();
                },
                immediate: true
            }
        }
    }
</script>