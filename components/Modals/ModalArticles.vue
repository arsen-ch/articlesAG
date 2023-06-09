<template>
    <modal ref="xmodal">

        <!-- Title -->
        <h3 class="title mt-x mb-1">{{ title }}</h3>

        <div class="controls">

            <!-- Parent category -->
            <x-select :hint="'Родительская категория'" class="mb-x">

                <i>
                    <x-option :index="-1"
                              :content="'Создать новую категорию...'"
                              @click="clickNewCategory()" />
                </i>

                <x-option v-for="( name, index ) in $store.getters.getCategories" :key="index"
                          :index="index"
                          :content="name"
                          @click="clickParentHandler( name )" />
            </x-select>

            <!-- New Category input-->
            <div v-show="showOptions" class="controls-new">
                <x-input v-model="newName" :show-icon="false" holder="Название новой категории" class="mb-x" />
                <button class="btn btn-new" @click="addNewCategory()">Создать</button>
            </div>

            <!-- Category row -->
            <items-row :array="categories" @delete-article="( key ) => { deleteHandler( key ); }" />

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
            entry: {},
            newName: '',
            categories: [],
            showOptions: false
        };
    },

    methods: {

        setContext( arg ) {

            if ( arg ) {
                this.entry = arg.entry;
                this.categories = structuredClone( this.$store.getters.getArticle( this.entry.id ) );
            }

        },

        clickParentHandler( key ) {

            // Error
            if ( this.categories.includes( key ) ) {
                this.$refs.xmodal.applyError();
                return;
            }

            this.categories.push( key );
        },

        deleteHandler( key ) {
            this.categories.splice( this.categories.indexOf( key ), 1 );
        },

        //

        clickNewCategory() {
            this.showOptions = true;
        },

        addNewCategory() {
            this.$store.dispatch( 'addCategory', { key: this.newName } );
            this.showOptions = false;
            this.newName = '';
        },

        apply() {

            const raw = this.$store.getters.getArticle( this.entry.id );

            // Delete
            const ints = this.categories.filter( x => raw.includes( x ) );
            const diff = raw.filter( x => !ints.includes( x ) );

            // Adds
            const outs = this.categories.filter( x => !raw.includes( x ) );

            // Save
            this.$store.dispatch( 'movArticle', {
                catDif: diff,
                articleId: this.entry.id,
                catAdd: outs,
                article: this.entry
            } );

        },

        clear() { }
    }
};
</script>

<style lang="scss">
.controls {

    &-new {
        display: flex;
    }

    .btn-new {
        width: 150px;
        margin-left: 5px;
    }

}
</style>
