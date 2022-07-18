<template>
    <component
        :is="currentPageComponent"
        :page-params="currentPageParams"
    />
</template>

<script>
    import MainPage from "@/pages/MainPage.vue";
    import ProductPage from "@/pages/ProductPage.vue";
    import NotFoundPage from "@/pages/NotFoundPage.vue";

    import eventBus from "@/eventBus.js";

    export default {
        name: 'App',
        components: {
            MainPage,
            ProductPage,
            NotFoundPage
        },
        data() {
            return {
                currentPage: "main",
                currentPageParams: {

                },
                routes: {
                    main: "MainPage",
                    product: "ProductPage",
                    notFound: "NotFoundPage"
                }
            }
        },
        methods: {
            goToPage(page, params) {
                this.currentPage = page;
                this.currentPageParams = (params || {});
            }
        },
        computed: {
            currentPageComponent() {
                return this.routes[this.currentPage] || this.routes.notFound;
            }
        },
        created() {
            eventBus.$on("goToPage", (page, params) => this.goToPage(page, params));
        }
    }
</script>