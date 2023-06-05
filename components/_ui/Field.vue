<template>
    <div style="width: 100%; height: 100%; position: relative;">
        <input :id="id" class="input" :name="id" :placeholder="holder">
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

        onEnter() {

        },

        onChange() {

        }
    }

};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";
$indent: 5px;

.input,
.textarea {
    transition: border-color .2s ease-in-out;

    font-size: 14px;
    font-family: $font-body;

    background: #fff;
    border: 1px solid $color-border;
    border-radius: calc($border-radius / 2);
    outline: 0;
    // padding: 5px 10px;
    text-align: left;

    width: 100%;
    height: 46px;
    text-indent: $indent;
    line-height: 1;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

}

.icon {
    transition: opacity .3s ease;

    font-size: 1em;
    border-radius: 0 4px 4px 0;
    opacity: .5;

    display: inline-block;
    line-height: 1em;
    text-align: center;

    position: absolute;
    top: 0;
    right: $indent;
    margin: 0;

    width: 32px;
    height: 100%;

    z-index: 2;
}
</style>
