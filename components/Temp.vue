<template>
    <div>

        <h3>Категория</h3>
        <input v-model="categoryInput" type="text" placeholder="Новая категория" />
        <input v-model="newParent" type="text" placeholder="Новая категория" />
        <button @click="addCategory()">+</button>

        <br>

        <!-- <h3>Субкатегория</h3>
        <input v-model="category" type="text" placeholder="Категория" />
        <input v-model="subcategoryInput" type="text" placeholder="Новая субкатегория" />
        <button @click="addSubcategory()">+</button> -->

        <h3>Карточки</h3>
        <input v-model="cardCat" type="text" placeholder="Категория" />
        <!-- <input v-model="cardSub" type="text" placeholder="Новая субкатегория" /> -->
        <select v-model="cardArt">
            <option v-for="article in $store.getters.getArticles" :key="article.id" :value="article">
                {{ article.title }}
            </option>
        </select>

        <button @click="addArticle()">+</button>

        <h3>Parent</h3>
        <input v-model="curParent" type="text" placeholder="Parent" />
        <input v-model="newParent" type="text" placeholder="New Parent" />
        <button @click="changeParent()">+</button>

        {{ $store.getters.getContent }}
        <br>
        <br>

        <div v-for="(val, title) in $store.getters.getContent" :key="title">

            <h1> <button @click.stop="delCategory( title )">-</button>
                --{{ title }}--</h1>

            <!-- Main entries -->
            <div v-for="entry in val.main" :key="entry.id">
                <button @click.stop="delArticle( title, entry.id )">-</button>
                {{ entry.title }}
            </div>

            <!-- Subs entries -->
            <div v-for="(arr, subcategory) in val.subs" :key="arr.id">
                <h4><button @click.stop="delCategory( subcategory )">-</button>{{ subcategory }}</h4>
                <div v-for="entry in arr" :key="entry.id">
                    <button @click.stop="delArticle( subcategory, entry.id )">-</button>
                    {{ entry.title }}
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            categoryInput: '',

            category: '',
            subcategoryInput: '',

            cardCat: '',
            cardSub: '',
            cardArt: '',

            curParent: '',
            newParent: ''
        };
    },

    mounted() {
        this.loadStorage();
        window.addEventListener( 'beforeunload', () => { localStorage.clear(); }, { once: true } );
    },

    beforeDestroy() {
        this.saveStorage();

        // window.removeEventListener( 'beforeunload' );
    },

    methods: {

        loadStorage() {
            // const data = JSON.parse( localStorage.getItem( 'categories' ) );
        },

        saveStorage() {
            // localStorage.setItem( 'categories', JSON.stringify( { 'Obaseki Nosa': 1 } ) );
        },

        addCategory() {
            this.$store.commit( 'addCategory', { key: this.categoryInput, parent: this.newParent } );
            this.categoryInput = '';
        },

        delCategory( key ) {
            console.log( 'key', key );
            this.$store.commit( 'delCategory', key );
        },

        addArticle() {
            const [ key, article ] = [ this.cardCat, this.cardArt ];
            this.$store.commit( 'addArticle', { key, article } );
        },

        delArticle( key, articleId ) {
            console.log( 'key,articleId', key, articleId );
            this.$store.commit( 'delArticle', { key, articleId } );
        },

        changeParent() {
            this.$store.commit( 'changeParent', { key: this.curParent, parent: this.newParent } );
        }
    }

};

</script>
