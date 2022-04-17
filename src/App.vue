<template>
  <section class="catalog">
        <ProductList
          :products="products"
        />

        <BasePagination
          v-model="page"
          :count="productsCount"
          :per-page="productsPerPage"
        />
      </section>
</template>

<script>
import products from "./data/products.js";
import ProductList from "./components/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination
  },
  data() {
    return {
      page: 3,
      productsPerPage: 4
    }
  },
  computed: {
    products() {
      let offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return products.length;
    }
  }
}
</script>