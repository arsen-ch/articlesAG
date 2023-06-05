<template>
    <x-modal ref="xmodal" @close-modal="isVisible = false">

        <!-- Content -->
        <div>

            <h3 class="title my-x">Новая категория </h3>

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
                <articles-row :articles="selectedArticles"
                              @delete-article="( index ) => { deleteArticle( index ); }" />

            </div>
        </div>

    </x-modal>
</template>

<script>
export default {

    name: 'ModalNewCategory',

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

        deleteArticle( index ) {
            this.selectedArticles.splice( index, 1 );
        }
    }
};

</script>
