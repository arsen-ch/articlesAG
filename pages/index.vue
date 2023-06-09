<template>
    <section class="container">

        <!-- <div :class="[ 'dimmer loading', { 'active': true } ]"></div> -->

        <!-- Header -->
        <head-box />

        <!-- Search result -->
        <template v-if="$store.state.filterString !== ''">

            <div class="row">
                <div v-for="entry in $store.getters.uniqArticles" :key="entry.timestamp" class="col-4">
                    <card :category="entry.category" :entry="entry" class="mb-x" />
                </div>
            </div>

        </template>

        <!-- Main grid -->
        <template v-if="$store.state.filterString === ''">

            <!-- Grid -->
            <grid-box :content="pagedData" />

            <!-- Pagination -->
            <x-pagination :total="pagination.total" :current="pagination.current" :rows="pagination.rows"
                          @change="paginationHandler" />

        </template>

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

    data() {
        return {
            pagination: {
                current: 1,
                rows: 4,
                total: 0
            }
        };
    },

    computed: {

        pagedData() {

            const entries = this.$store.getters.getContent;
            const current = ( this.pagination.current - 1 ) * this.pagination.rows;

            return entries.slice( current, current + this.pagination.rows );
        }
    },

    watch: {

        '$store.state.categories': {
            handler() {
                this.$store.commit( 'setContent' );
            },
            deep: true
        },

        '$store.state.content': {
            handler() {
                this.pagination.total = this.$store.state.content.length || 1;
            }
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

            // this.$nextTick( () => {
            //     xmodal.$el.focus();
            // } );

        },

        paginationHandler( current ) {
            this.pagination.current = current;
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
