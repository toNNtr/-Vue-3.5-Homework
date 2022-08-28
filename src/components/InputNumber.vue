<template>
  <div class="form__counter">
    <button type="button" aria-label="Уменьшить количество"
        @click="value--"
    >
        <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
        </svg>
    </button>

    <input type="text" v-model.number="value" name="count">

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
    data() {
        return {
            value: this.initialValue
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue, oldValue) {
                if(isNaN(newValue) && newValue != "-") {
                    this.value = oldValue;
                } else if(!isNaN(newValue)) {
                    if(this.min != undefined) {
                        newValue = Math.max(this.min, newValue);
                        oldValue = Math.max(this.min, oldValue);
                    }
                    if(this.max != undefined) {
                        newValue = Math.min(this.max, newValue);
                        oldValue = Math.min(this.max, oldValue);
                    }
    
                    if(oldValue != this.value) {
                        this.value = newValue;
                        if(newValue != oldValue) {
                            this.$emit("onValueChanged", newValue);
                        }
                    }
                }
            }
        },
        initialValue(newValue) {
            this.value = newValue;
        }
    }
}
</script>