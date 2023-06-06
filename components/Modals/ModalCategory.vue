<template>
    <modal ref="xmodal">

        <!-- Content -->
        <div>

            <!-- Title -->
            <h3 class="title mt-x mb-1">{{ title }}</h3>

            <!-- Controls -->
            <div class="controls">

                <!-- Category input-->
                <x-input v-model="name" :show-icon="false" holder="Название" class="mb-x" />

                <!-- Parent category -->
                <x-select :preselect="parent" :hint="'Родительская категория'" class="mb-x">
                    <x-option v-for="( name, index ) in $store.getters.getCategories" :key="index"
                              :index="index"
                              :content="name"
                              @click="clickParentHandler( name )" />
                </x-select>

                <!-- Insert articles -->
                <x-select :hint="'Вложенные статьи'" class="mb-x">
                    <x-option v-for="( article, index ) in $store.getters.getArticles" :key="index"
                              :index="index"
                              :content="article.title"
                              @click="clickArticlesHandler( article )" />
                </x-select>

                <!-- Article row -->
                <items-row :articles="articles"
                           @delete-article="( index ) => { deleteHandler( index ); }" />

            </div>

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
            articles: [],
            editMode: null
        };
    },

    methods: {

        clickParentHandler( name ) {
            this.parent = name;
        },

        clickArticlesHandler( article ) {
            this.articles.push( article );
        },

        deleteHandler( index ) {
            this.articles.splice( index, 1 );
        },

        setContext( arg ) {

            if ( !arg ) { return; }
            const category = this.$store.state.categories[ arg ];

            this.name = arg;
            this.parent = category.parent || null;
            this.articles = Object.values( category.articles );

            this.editMode = arg;

        },

        apply() {

            if ( this.name === '' ) { return; }

            if ( this.editMode ) {
                this.$store.commit( 'renameCategory', { oKey: this.editMode, nKey: this.name } );
                this.$store.commit( 'changeParent', { key: this.name, newParent: this.parent } );
                this.$store.commit( 'updArticles', { key: this.name, articles: this.articles } );
            }

            if ( !this.editMode ) {
                this.$store.commit( 'addCategory', { key: this.name, parent: this.parent } );
                this.$store.commit( 'addArticles', { key: this.name, articles: this.articles } );
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
