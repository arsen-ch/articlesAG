<template>
    <modal ref="xmodal">

        <!-- Content -->
        <div>

            <!-- Title -->
            <h3 class="title my-x">{{ title }}</h3>

            <!-- Controls -->
            <div class="controls">

                <!-- Category -->
                <x-input holder="Название" :show-icon="false" class="mb-x" @input="( e ) => selectedName = e" />

                <!-- Parent category -->
                <x-select :hint="'Родительская категория'" class="mb-x">
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
                <items-row :articles="selectedArticles"
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
            selectedName: '',
            selectedParent: null,
            selectedArticles: []
        };
    },

    methods: {

        clickParentHandler( name ) {
            this.selectedParent = name;
        },

        clickArticlesHandler( article ) {
            this.selectedArticles.push( article );
        },

        deleteHandler( index ) {
            this.selectedArticles.splice( index, 1 );
        },

        apply() {

            if ( this.selectedName !== '' ) {
                this.$store.commit( 'addCategory', { key: this.selectedName, parent: this.selectedParent } );
                this.$store.commit( 'addArticles', { key: this.selectedName, articles: this.selectedArticles } );
            }

            // Close
            this.clear();

        },

        clear() {

            this.selectedName = '';
            this.selectedParent = null;
            this.selectedArticles = [];

        }
    }
};

</script>
