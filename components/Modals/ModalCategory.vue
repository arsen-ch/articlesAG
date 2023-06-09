<template>
    <modal ref="xmodal">

        <!-- Title -->
        <h3 class="title mt-x mb-1">{{ title }}</h3>

        <!-- Controls -->
        <div class="controls">

            <!-- Category input-->
            <x-input v-model="name" :show-icon="false" holder="Название" class="mb-x" />

            <!-- Parent category -->
            <x-select :preselect="parent" :hint="'Родительская категория'" class="mb-x">
                <x-option v-for="( category, index ) in $store.getters.getCategories" :key="index"
                          :index="index"
                          :content="category"
                          @click="clickParentHandler( category )" />
            </x-select>

            <!-- Insert articles -->
            <x-select :hint="'Вложенные статьи'" class="mb-x">
                <x-option v-for="( article, index ) in $store.getters.getArticlesData" :key="index"
                          :index="index"
                          :content="article.title"
                          @click="clickArticlesHandler( article )" />
            </x-select>

            <!-- Article row -->
            <items-row :array="articles" @delete-article="( key ) => { deleteHandler( key ); }" />

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
            name: '',
            parent: null,
            articles: {},
            editMode: null
        };
    },

    methods: {

        setContext( arg ) {

            if ( !arg ) { return; }
            const category = this.$store.state.categories[ arg ];

            this.name = arg;
            this.parent = category.parent || null;
            this.articles = structuredClone( category.articles );

            this.editMode = arg;

        },

        clickParentHandler( name ) {
            this.parent = name;
        },

        clickArticlesHandler( article ) {
            this.$set( this.articles, article.id, article );
        },

        deleteHandler( key ) {
            this.$delete( this.articles, key );
        },

        apply() {

            if ( this.name === '' ) { return; }

            if ( !this.editMode ) {
                this.$store.dispatch( 'addArticles', { key: this.name, parent: this.parent, articles: this.articles } );
            } else {
                this.$store.dispatch( 'updArticles', { key: this.name, oKey: this.editMode, parent: this.parent, articles: this.articles } );
            }

            // Close
            this.clear();

        },

        clear() {

            this.name = '';
            this.parent = null;
            this.articles = [];

            this.editMode = null;

        }
    }
};

</script>
