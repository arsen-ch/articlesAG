<template>
    <modal ref="xmodal">

        <!-- Content -->
        <div>

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
            parent: null,
            articles: []
        };
    },

    methods: {

        clickParentHandler( name ) {
            this.parent = name;
        },

        deleteHandler( index ) {
            this.articles.splice( index, 1 );
        },

        setContext() { },

        apply() {

            // if ( this.selectedName !== '' ) {
            //     this.$store.commit( 'addCategory', { key: this.selectedName, parent: this.parent } );
            //     this.$store.commit( 'addArticles', { key: this.selectedName, articles: this.articles } );
            // }

            // Close
            this.clear();

        },

        clear() {
            this.parent = null;
        }
    }
};

</script>
