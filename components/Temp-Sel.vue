<template>
    <div id="app">

        <input v-model="searchString" type="text" placeholder="Search title.." />
        <label>Search title:{{ searchString }}</label>

        <div v-for="(post, index) in filteredList" :key="index">
            {{ post }}
        </div>

        <select v-model="user">
            <option>Tom</option>
            <option>Bob</option>
            <option>Sam</option>
        </select>

        <span>Выбрано: {{ user }}</span>

    </div>
</template>

<script>
export default {

    data() {
        return {
            users: [
                { name: 'Tom', age: 22 },
                { name: 'Bob', age: 25 },
                { name: 'Sam', age: 28 },
                { name: 'Alice', age: 26 }
            ],
            selectedUsers: [],
            user: 'Tom',
            list: [ 'hello', 'kitty', 'it', 'math', 'is', 'fun', 'hello' ],
            searchString: ''
        };
    },

    computed: {
        filteredList() {
            return this.list.filter( ( word ) => {
                return word.toLowerCase().includes( this.searchString.toLowerCase() );
            } );
        }
    },

    watch: {
        selectedUsers() {
            if ( this.selectedUsers.name === 'Tom' ) {
                console.log( 'hello' );
            }
        }

    }

};

</script>
