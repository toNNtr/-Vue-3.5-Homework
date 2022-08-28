import Vue from "vue";
import Vuex from "vuex";

import products from "@/data/products.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [
            {
                productID: 3778996,
                amount: 3
            }
        ]
    },
    mutations: {
        addProductToCart(state, {productID, amount}) {
            const cartProduct = state.cartProducts.find(value => value.productID == productID);
            if(cartProduct) {
                cartProduct.amount += amount;
                return;
            }
            
            state.cartProducts.push({
                productID,
                amount
            });
        },
        updateCartProductAmount(state, {productID, amount}) {
            const cartProduct = state.cartProducts.find(value => value.productID == productID);
            cartProduct.amount = amount;
        },
        deleteCartProduct(state, productID) {
            state.cartProducts = state.cartProducts.filter(cartProduct => cartProduct.productID != productID);
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                return {
                    ...item,
                    product: products.find(product => product.id == item.productID)
                };
            });
        },
        totalCartPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, cartProduct) => {
                return acc + cartProduct.amount * cartProduct.product.price;
            }, 0);
        },
        cartProductsAmount(state) {
            return state.cartProducts.reduce((acc, cartProduct) => acc + cartProduct.amount, 0);
        }
    }
});