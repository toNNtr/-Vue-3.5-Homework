<template>
    <div class=""
        v-if="products.length > 0"
    >
        <ul class="catalog__list">
            <li class="catalog__item"
                v-for="(product) in products"
                :key="product.id"
            >
            <ProductItem
                :product="product"
            />
            </li>
        </ul>
    </div>
    <div class="" style="align-self: center;"
        v-else
    >
        <h3>Ничего не найдено 😥</h3>
    </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
    props: ['products'],
    components: {
        ProductItem
    }
};

</script>
