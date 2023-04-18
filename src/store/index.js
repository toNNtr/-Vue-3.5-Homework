import Vue from "vue";
import Vuex from "vuex";

import { API_BASE_URL } from "@/config.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: null,
        isCartLoading: false,
        categories: [],
        colors: [],
        orderInfo: null
    },
    mutations: {
        addProductToCart(state, { productID, amount }) {
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
        updateCartProductAmount(state, { productID, amount }) {
            const cartProduct = state.cartProducts.find(value => value.productID == productID);
            cartProduct.amount = amount;
        },
        deleteCartProduct(state, productID) {
            state.cartProducts = state.cartProducts.filter(cartProduct => cartProduct.productID != productID);
        },
        updateUserAccessKey(state, userAccessKey) {
            state.userAccessKey = userAccessKey;
        },
        updateCartProductsData(state, cartProductsData) {
            state.cartProductsData = cartProductsData;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productID: item.product.id,
                    amount: item.quantity
                }
            });
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = {
                ...orderInfo,
                amount: orderInfo.basket.items.reduce((previousValue, currentItem) => {
                    return previousValue + currentItem.quantity;
                }, 0)
            };
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(l_product => l_product.product.id == item.productID).product;
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
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
        },
        isCartLoading(state) {
            return state.isCartLoading;
        },
        categories(state) {
            return state.categories;
        },
        colors(state) {
            return state.colors;
        },
        orderInfo(state) {
            return id => {
                if(state.orderInfo && state.orderInfo.id == id) {
                    return state.orderInfo;
                }
    
                return null;
            }
        }
    },
    actions: {
        loadCart(context) {
            context.state.isCartLoading = true;
            
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/baskets?`
                + new URLSearchParams({
                    userAccessKey: context.state.userAccessKey
                })
                , {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if(!response.ok) {
                        throw new Error("Не удалось получить данные.");
                    }
    
                    return response.json();
                })
                .then(responseBody => {
                    if(!context.state.userAccessKey) {
                        localStorage.setItem("userAccessKey", responseBody.user.accessKey);
                        context.commit("updateUserAccessKey", responseBody.user.accessKey);
                    }
                    
                    context.commit("updateCartProductsData", responseBody.items);
                    context.commit("syncCartProducts");
                }).finally(() => {
                    context.state.isCartLoading = false;
                });
            })
        },
        addProductToCart(context, { productID, amount }) {
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "productId": productID,
                        "quantity": amount
                    })
                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }
    
                    return response.json();
                })
                .then(responseBody => {
                    context.commit("updateCartProductsData", responseBody.items);
                    context.commit("syncCartProducts");
                });
            })
        },
        updateCartProductAmount(context, { productID, amount }) {
            if(isNaN(amount) || amount < 1) {
                return;
            }

            context.commit("updateCartProductAmount", { productID, amount });

            return fetch(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "productId": productID,
                    "quantity": amount
                })
            })
            .then(response => {
                if(!response.ok) {
                    throw response.statusText;
                }

                return response.json();
            })
            .then(responseBody => {
                context.commit("updateCartProductsData", responseBody.items);
            })
            .catch(reason => {
                context.commit("syncCartProducts");
            });
        },
        deleteCartProduct(context, productID) {
            context.commit("deleteCartProduct", productID);

            return fetch(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "productId": productID
                })
            })
            .then(response => {
                if(!response.ok) {
                    throw response.statusText;
                }

                return response.json();
            })
            .then(responseBody => {
                context.commit("updateCartProductsData", responseBody.items);
            })
            .catch(reason => {
                context.commit("syncCartProducts");
            });
        },
        loadCategories(context) {
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/productCategories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }
    
                    return response.json();
                })
                .then(responseBody => {
                    context.state.categories = responseBody.items;
                });
            });
        },
        loadColors(context) {
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/colors`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }
    
                    return response.json();
                })
                .then(responseBody => {
                    context.state.colors = responseBody.items.map(color => {
                        return {
                            ...color,
                            value: color.code
                        };
                    });
                });
            });
        },
        loadProducts(context, { page, limit, categoryID, colorID, minPrice, maxPrice }) {
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/products?${ new URLSearchParams({
                    page,
                    limit,
                    categoryId: categoryID,
                    colorId: colorID,
                    minPrice,
                    maxPrice
                })}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }

                    return response.json();
                });
            });
        },
        loadProduct(context, { productID }) {
            return new Promise(resolve => setTimeout(resolve, 0))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/products/${ productID }`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }

                    return response.json();
                });
            });
        },
        sendOrder(context, formData) {
            return new Promise(resolve => setTimeout(resolve, 2000))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/orders?userAccessKey=${context.state.userAccessKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if(response.status != 200 & response.status != 400) {
                        throw response.statusText;
                    }

                    return response.json();
                })
            })
        },
        loadOrderInfo(context, orderID) {
            return new Promise(resolve => setTimeout(resolve, 2000))
            .then(() => {
                return fetch(`${API_BASE_URL}/api/orders/${orderID}?userAccessKey=${context.state.userAccessKey}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                .then(response => {
                    if(!response.ok) {
                        throw response.statusText;
                    }

                    return response.json();
                })
                .then(responseBody => {
                    context.commit("updateOrderInfo", responseBody);
                });
            })
        }
    }
});