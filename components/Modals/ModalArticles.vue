<template>
    <modal ref="xmodal">

        <!-- Content -->
        <div>

            <!-- Title -->
            <h3 class="title my-x">{{ title }}</h3>

            <div class="controls">

                <!-- Parent category -->
                <x-select :hint="'Родительская категория'" class="mb-x">
                    <x-option v-for="( name, index ) in $store.getters.getCategories" :key="index"
                              :index="index"
                              :content="name"
                              @click="clickParentHandler( name )" />
                </x-select>

                <!-- Category row -->
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
            selectedParent: null,
            selectedArticles: []
        };
    },

    methods: {

        clickParentHandler( name ) {
            this.selectedParent = name;
        },

        deleteHandler( index ) {
            this.selectedArticles.splice( index, 1 );
        },

        apply() {

            // if ( this.selectedName !== '' ) {
            //     this.$store.commit( 'addCategory', { key: this.selectedName, parent: this.selectedParent } );
            //     this.$store.commit( 'addArticles', { key: this.selectedName, articles: this.selectedArticles } );
            // }

            // Close
            this.clear();

        },

        clear() {
            this.selectedParent = null;
        }
    }
};

</script>
