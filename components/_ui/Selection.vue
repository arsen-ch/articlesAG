<template>
    <select :id="id" v-model="currentArticle" :placeholder="holder">
        <option v-for="article in $store.getters.getArticles" :key="article.id" :value="article">
            {{ article.title }}
        </option>
    </select>
</template>

<script>
export default {

    props: {
        id: { type: String, default: 'select' },
        holder: { type: String, default: 'Найти...' }
    },

    data() {
        return {
            currentArticle: ''
        };
    },

    watch: {
        selectedUsers() { }

    }

};

</script>
