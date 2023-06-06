<template>
    <section class="container">

        <!-- Header -->
        <header-box />

        <!-- Grid -->
        <grid />

        <!-- Modals -->
        <modal-category ref="modalNew" title="Новая категория" />
        <modal-category ref="ModalChg" title="Редактирование категории" />
        <modal-articles ref="modalArt" title="Изменения расположения статьи" />

    </section>
</template>

<script>
export default {

    mounted() {
        this.$root.$on( 'setVisible', this.setVisible );
    },

    beforeDestroy() {
        this.$root.$off( 'setVisible' );
    },

    methods: {
        setVisible( [ modal, arg ] ) {
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
