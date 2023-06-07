<template>
    <section class="container">

        <!-- Header -->
        <head-box />

        <!-- Grid -->
        <grid />

        <!-- Modals -->
        <modal-category ref="modalNew" title="Новая категория" />
        <modal-category ref="modalChg" title="Редактирование категории" />
        <modal-articles ref="modalArt" title="Изменение расположения статьи" />
        <modal-question ref="modalQst" title="Удалить категорию?" />

    </section>
</template>

<script>
export default {

    watch: {

        '$store.state.categories': {
            handler() {
                this.$store.commit( 'setContent' );
            },
            deep: true
        }

    },

    mounted() {
        this.$store.commit( 'setContent' );
        this.$root.$on( 'setVisible', this.setVisible );
    },

    // beforeDestroy() {
    //     this.$root.$off( 'setVisible' );
    // },

    methods: {
        setVisible( { modal, arg } ) {
            const xmodal = this.$refs[ modal ].$refs.xmodal;
            xmodal.show( arg || null );
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

//

.slide-enter-active,
.slide-leave-active,
.slide-move {
    transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: all;
}

.slide-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
}

.slide-enter-to {
    opacity: 1;
    transform: scaleY(1);
}

.slide-leave-active {
    position: absolute;
}

.slide-leave-to {
    opacity: 0;
    transform-origin: center center;
}
</style>
