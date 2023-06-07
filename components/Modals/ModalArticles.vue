<template>
    <modal ref="xmodal">

        <!-- Title -->
        <h3 class="title mt-x mb-1">{{ title }}</h3>

        <div class="controls">

            <!-- Parent category -->
            <x-select :hint="'Родительская категория'" class="mb-x">
                <x-option v-for="( name, index ) in $store.getters.getCategories" :key="index"
                          :index="index"
                          :content="name"
                          @click="clickParentHandler( name )" />
            </x-select>

            <!-- Category row -->
            <items-row :articles="articles" @delete-article="( key ) => { deleteHandler( key ); }" />

        </div>
    </modal>
</template>

<script>
export default {

    props: {
        title: { type: String, default: '' }
    },

    data() {
        return {
            entryId: null,
            articles: []
        };
    },

    methods: {

        setContext( arg ) {
            this.entryId = arg?.id || null;
            this.articles = structuredClone( this.$store.getters.getArticle( this.entryId ) );
        },

        clickParentHandler( key ) {

            if ( this.articles.includes( key ) ) {
                this.$emit( 'error' );
                return;
            }

            this.articles.push( key );
        },

        deleteHandler( key ) {
            this.articles.splice( this.articles.indexOf( key ), 1 );
        },

        apply() {

            // this.$store.commit( 'delArticle', { key: this.category, articleId: this.id } );

            // Close
            this.clear();

        },

        clear() {

            // this.id = null;
            // this.parent = null;
            // this.category = null;

        }
    }
};
</script>
