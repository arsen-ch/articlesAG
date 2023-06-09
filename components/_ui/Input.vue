<template>
    <div style="width: 100%; height: 100%; position: relative;">

        <input :id="id"
               :name="id"
               :placeholder="holder"
               :value="value"
               class="input"
               @input="updateValue( $event.target.value )"
               @keydown.enter="$emit( 'enter' )">

        <img v-if="icon" class="icon vertical-center" :src="`svg/${icon}.svg`" />

    </div>
</template>

<script>
export default {

    props: {
        id: { type: String, default: 'xinput' },
        icon: { type: [ String, null ], default: null },
        value: { type: [ String, Number, null ], default: null },
        holder: { type: String, default: 'Найти...' }
    },

    methods: {

        updateValue( v ) {
            this.changeHandler( v );
        },

        clearHandler() {
            this.changeHandler( '' );
        },

        changeHandler( v ) {
            this.$emit( 'input', v );
        }
    }

};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";
$indent: 5px;

.input,
.textarea {
    width: 100%;
    height: 46px;
}
</style>
