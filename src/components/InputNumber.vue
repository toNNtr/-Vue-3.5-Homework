<template>
  <div class="form__counter">
    <button type="button" aria-label="Уменьшить количество"
        @click="value--"
    >
        <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
        </svg>
    </button>

    <input type="text" v-model.number.lazy="value" name="count">

    <button type="button" aria-label="Увеличить количество"
        @click="value++"
    >
        <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
        </svg>
    </button>
</div>
</template>

<script>
export default {
    props: {
        canDecrease: {
            type: Boolean,
            default: true
        },
        canIncrease: {
            type: Boolean,
            default: true
        },
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        initialValue: {
            type: Number,
            required: true
        }
    },
    model: {
        prop: "initialValue",
        event: "onValueChanged"
    },
    computed: {
        value: {
            get() {
                return this.initialValue;
            },
            set(newValue) {
                if(this.min != undefined) {
                    newValue = Math.max(this.min, newValue);
                }
                if(this.max != undefined) {
                    newValue = Math.min(this.max, newValue);
                }

                if(newValue != this.initialValue) {
                    this.$emit("onValueChanged", newValue);
                }
            }
        }
    }
}
</script>