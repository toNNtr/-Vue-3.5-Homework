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
    import products from "@/data/products.js";
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
                }
            };
        },
        computed: {
            filteredProducts() {
                let filteredProducts = products;

                /** Фильтрация по минимальной и максимальной стоимости */
                if (this.filter.minPrice > 0) {
                    filteredProducts = filteredProducts.filter(product => product.price >= this.filter.minPrice);
                }

                if (this.filter.maxPrice > 0) {
                    filteredProducts = filteredProducts.filter(product => product.price <= this.filter.maxPrice);
                }


                /** Фильтрация по категории */
                if (this.filter.categoryID) {
                    filteredProducts = filteredProducts.filter(product => product.categoryID == this.filter.categoryID);
                }


                /** Фильтрация по цвету */
                if (this.filter.colorID) {
                    filteredProducts = filteredProducts.filter(product => product.colors.includes(this.filter.colorID));
                }

                return filteredProducts;
            },
            products() {
                let offset = (this.page - 1) * this.productsPerPage;
                return this.filteredProducts.slice(offset, offset + this.productsPerPage);
            },
            productsCount() {
                return this.filteredProducts.length;
            }
        }
    }
</script>