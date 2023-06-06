<template>
    <div class="items-wrapper">
        <div class="items-row">
            <div v-for="(article, index) in articles" :key="index">
                <div class="articles-item">
                    <button class="btn btn-tag" @click="deleteHandler( index )">
                        <img src="/svg/delete.svg" alt="">
                    </button>
                    {{ article.title.slice( 0, 20 ) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        articles: { type: Array, default: () => [] }
    },

    methods: {
        deleteHandler( index ) {
            this.$emit( 'delete-article', index );
        }
    }

};
</script>

<style lang="scss">
.items {

    &-wrapper {

        height: 230px;
        overflow-y: scroll;
    }

    &-row {

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        font-size: 12px;

        & :not(:last-child) {
            margin-right: 10px;
        }

        .articles-item {

            display: flex;
            flex-direction: row;
            align-items: center;

            width: 200px;

            .btn {

                margin-right: 10px;
                margin-top: 5px;

                width: 32px;
                height: 32px;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
