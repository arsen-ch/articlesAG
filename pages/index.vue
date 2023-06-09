<template>
    <section class="container">

        <transition name="fade">
            <div v-show="$store.state.isLoading" :class="[ 'loader', { 'active': $store.state.isLoading } ]"></div>
        </transition>

        <!-- Header -->
        <head-box />

        <empty-box v-if="$store.getters.getContent.length === 0" />

        <!-- Search result -->
        <template v-if="!notSearch">

            <div class="row">
                <div v-for="entry in $store.getters.uniqArticles" :key="entry.timestamp" class="col-4">
                    <card :category="entry.category" :entry="entry" class="mb-x" />
                </div>
            </div>

        </template>

        <!-- Main grid -->
        <template v-if="notSearch">

            <!-- Grid -->
            <grid-box :content="pagedData" />

            <!-- Pagination -->
            <x-pagination v-if="$store.getters.getContent.length > 4"
                          :total="pagination.total"
                          :current="pagination.current"
                          :rows="pagination.rows"
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

        <top-back />

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

        notSearch() {
            return this.$store.state.filterString === '';
        },

        pagedData() {

            const entries = this.$store.getters.getContent;
            const current = ( this.pagination.current - 1 ) * this.pagination.rows;

            return entries.slice( current, current + this.pagination.rows );
        }
    },

    watch: {

        '$store.state.content': {
            handler() {
                this.pagination.total = this.$store.state.content.length || 1;
            },
            deep: true
        }

    },

    beforeMount() {
        window.addEventListener( 'beforeunload', this.storeCategories );
    },

    beforeDestroy() {
        window.removeEventListener( 'beforeunload', this.storeCategories, false );
    },

    mounted() {

        this.$root.$on( 'setVisible', this.setVisible );

        // Load item
        const item = JSON.parse( window.localStorage.getItem( 'articlesAG' ) );
        if ( item ) {
            this.$store.commit( 'setValue', { field: 'categories', val: item } );
        }

        // Init
        this.$store.commit( 'setContent' );

        // Load
        this.pseudoLoader();

    },

    methods: {

        storeCategories() {

            // Save item
            const categories = this.$store.getters.getStoreDate( 'categories' );
            if ( Object.keys( categories ).length > 0 ) {
                window.localStorage.setItem( 'articlesAG', JSON.stringify( categories ) );
            }

        },

        setVisible( { modal, arg } ) {

            const xmodal = this.$refs[ modal ]?.$refs?.xmodal || null;
            if ( !xmodal ) { return; }

            xmodal.show( arg || null );

            // this.$nextTick( () => {
            //     xmodal.$el.focus();
            // } );

        },

        paginationHandler( current ) {
            this.pagination.current = current;
        },

        pseudoLoader() {

            // a.
            this.$store.commit( 'setLoading', true );
            setTimeout( () => { this.$store.commit( 'setLoading', false ); }, 200 );

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

    &::-webkit-scrollbar {
        display: none;
    }
}

hr {
    border: 1px solid $color-inactive;
}
</style>
