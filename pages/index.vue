<template>
    <section class="container">
        {{ Object.entries( $store.getters.getContent ) }}

        <br><br>
        {{ $store.getters.getContent }}
        <!-- Header -->
        <head-box />

        <!-- Grid -->
        <grid-box :content="$store.getters.getContent" />

        <!-- New category -- dyn comp? -->
        <modal-category ref="modalNew" title="Новая категория" />

        <!-- Edit category  -->
        <modal-category ref="modalChg" title="Редактирование категории" />

        <!-- Change placement  -->
        <modal-articles ref="modalArt" title="Изменение расположения статьи" />

        <!-- Delete category -->
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

    overflow-y: scroll;
}

hr {
    border: 1px solid $color-inactive;
}
</style>
