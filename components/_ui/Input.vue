<template>
    <div style="width: 100%; height: 100%; position: relative;">

        <input :id="id"
               class="input"
               :name="id"
               :placeholder="holder"
               @input="updateValue( $event.target.value )"
               @keydown.enter="$emit( 'enter' )">

        <img v-if="showIcon" class="icon vertical-center" :src="`svg/${icon}.svg`" />

    </div>
</template>

<script>
export default {

    props: {
        id: { type: String, default: 'search' },
        icon: { type: String, default: 'search' },
        holder: { type: String, default: 'Найти...' },
        showIcon: { type: Boolean, default: false }
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
