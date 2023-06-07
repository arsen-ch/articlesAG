<template>
    <div class="items-wrapper">
        <div class="items-row">

            <transition-group name="fade" tag="div" class="row" @before-leave="beforeLeave">

                <div v-for="(article, key) in array" :key="article?.title ? article.id : article">
                    <div class="array-item">

                        <button class="btn btn-tag" @click="deleteHandler( article?.title ? key : article )">
                            <img src="/svg/delete.svg" alt="">
                        </button>
                        {{ article?.title ? article.title.slice( 0, 20 ) : article }}

                    </div>
                </div>

            </transition-group>

        </div>
    </div>
</template>

<script>
export default {

    props: {
        array: { type: [ Object, Array ], default: () => { } }
    },

    methods: {

        deleteHandler( key ) {
            this.$emit( 'delete-article', key );
        },

        beforeLeave( el ) {
            const { marginLeft, marginTop, width, height } = window.getComputedStyle( el );
            el.style.left = `${el.offsetLeft - parseFloat( marginLeft, 10 )}px`;
            el.style.top = `${el.offsetTop - parseFloat( marginTop, 10 )}px`;
            el.style.width = width;
            el.style.height = height;
        }
    }

};
</script>

<style lang="scss">
.items {

    &-wrapper {

        height: 230px;
        overflow-y: auto;
    }

    &-row {

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        font-size: 12px;

        & :not(:last-child) {
            margin-right: 10px;
        }

        .array-item {

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
