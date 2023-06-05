<template>
    <section class="container">

        <search-bar @category-create="setVisible( 'modalNew', true )" />

        <grid />

        <modal-new ref="modalNew" />

    </section>
</template>

<script>
export default {

    methods: {
        setVisible( modal, arg ) {
            this.$refs[ modal ].$refs.xmodal.isVisible = arg;
        }
    }

};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

html {
    word-spacing: $word-spacing;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

body {
    color: $color-body-fg;
    background: $color-body-bg;
    font-family: $font-body;
    font-size: $font-base-size;
    padding: 64px;
}

hr {
    border: 1px solid $color-inactive;
}

// a.
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: scale(1.03);
}
</style>
