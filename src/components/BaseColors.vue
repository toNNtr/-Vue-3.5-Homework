<template>
    <ul class="colors">
        <li class="colors__item"
            v-if="showClear"
        >
            <label class="colors__label" title="Очистить">
                <input class="colors__radio sr-only" type="radio" :name="`${_uid}color`"
                    v-model="currentColorID"
                    :value="null"
                >
                <span class="colors__value"
                    style="background-image: url('/img/x-mark.png'); background-color: #fff; background-size: cover; background-repeat: no-repeat;">
                </span>
            </label>
        </li>
        <li class="colors__item"
            v-for="color in colorsList"
            :key="color.id"
        >
            <label class="colors__label" :title="color.title">
                <input class="colors__radio sr-only" type="radio" :name="`${_uid}color`"
                    v-model="currentColorID"
                    :value="color.id"
                >
                <span class="colors__value" :style="{ 'background-color': `${color.value}`}">
                </span>
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    model: {
        prop: "selectedColor",
        event: "colorChanged"
    },
    props: {
        colors: Array,
        selectedColor: String,
        showClear: Boolean
    },
    data() {
        return {
            currentColorID: this.selectedColor
        };
    },
    computed: {
        colorsList() {
            return this.colors;
        }
    },
    watch: {
        currentColorID(newValue) {
            this.$emit("colorChanged", newValue);
        },
        selectedColor(newValue) {
            this.currentColorID = newValue;
        }
    }
}
</script>