<template>
    <div>
        <div class="search-bar mb-2">

            <!-- Create button -->
            <button class="btn btn-big" @click="clickHandler()">
                Создать категорию
                <img class="vertical-center" src="svg/plus.svg">
            </button>

            <!-- Search field -->
            <x-input v-model="filterString" icon="search" @enter="searchHandler" />

        </div>
    </div>
</template>

<script>
export default {

    computed: {

        filterString: {
            get() {
                return this.$store.state.filterString;
            },
            set( val ) {
                this.$store.dispatch( 'search', val ); // this.uniqArticles[ val ]
            }
        }
    },

    methods: {
        clickHandler() {
            this.$root.$emit( 'setVisible', { modal: 'modalNew' } );
        },

        searchHandler() {
            this.$store.commit( 'setContent' );
        }
    }

};
</script>

<style lang="scss">
.search-bar {

    display: flex;

    .btn-big {
        width: 280px;
        margin-right: 16px;
    }

    .btn-search {
        width: 32px;
        margin-left: 5px;
    }
}
</style>
