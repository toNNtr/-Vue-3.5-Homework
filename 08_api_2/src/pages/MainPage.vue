<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
                152 товара
            </span>
        </div>

        <div class="content__catalog">

            <ProductFilter
                :min-price.sync="filter.minPrice"
                :max-price.sync="filter.maxPrice"
                :category-id.sync="filter.categoryID"
                :color-id.sync="filter.colorID"
            />

            <section class="catalog">
                <div class=""
                    v-if="productsLoading"
                >
                    Загрузка товаров...
                </div>
                <div class=""
                    v-if="productsLoadingFailed"
                >
                    При загрузке произошла ошибка.
                    <button
                        @click.prevent="loadProductsData"
                    >
                        Попробовать еще раз
                    </button>
                </div>
                <ProductList
                    :products="products"
                />

                <BasePagination
                    v-if="products.length > 0"
                    v-model="page"
                    :count="productsCount"
                    :per-page="productsPerPage"
                />
            </section>
        </div>
    </main>
</template>

<script>
    import { mapActions } from "vuex";

    import ProductList from "@/components/ProductList.vue";
    import ProductFilter from "@/components/ProductFilter.vue";
    import BasePagination from "@/components/BasePagination.vue";


    export default {
        props: ["page-params"],
        components: {
            ProductList,
            ProductFilter,
            BasePagination
        },
        data() {
            return {
                page: 1,
                productsPerPage: 4,
                filter: {
                    minPrice: 0,
                    maxPrice: 0,
                    categoryID: null,
                    colorID: null
                },
                productsData: null,
                productsLoading: false,
                productsLoadingFailed: false,
            };
        },
        computed: {
            products() {

                return this.productsData ? this.productsData.items.map(product => {
                        return {
                            ...product,
                            image: product.image.file.url,
                            colors: product.colors.map(color => {
                                return {
                                    ...color,
                                    value: color.code
                                };
                            })
                        };
                    }) : [];
            },
            productsCount() {
                if(!this.productsData) {
                    return 0;
                }

                return this.productsData.pagination ? this.productsData.pagination.total : this.products.length;
            }
        },
        methods: {
            ...mapActions({
                loadProducts: "loadProducts"
            }),
            loadProductsData() {
                this.productsLoading = true;
                this.productsLoadingFailed = false;

                this.loadProducts({
                    page: this.page,
                    limit: this.productsPerPage,
                    categoryID: this.filter.categoryID,
                    colorID: this.filter.colorID,
                    minPrice: this.filter.minPrice,
                    maxPrice: this.filter.maxPrice
                })
                .then(productsData => {
                    this.productsData = productsData;
                })
                .catch(reason => {
                    this.productsLoadingFailed = true;
                })
                .finally(() => {
                    this.productsLoading = false;
                });
            }
        },
        watch: {
            page() {
                this.loadProductsData();
            },
            filter: {
                handler() {
                    this.loadProductsData();
                },
                deep: true
            }
        },
        created() {
            this.loadProductsData();
        }
    }
</script>