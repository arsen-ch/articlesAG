<template>
    <div class="empty-box">
        <h3 class="title mb-x mt-5">Пока статей нет</h3>
        <p class="mt-x mb-1">Создайте свою первую категорию и добавьте в неё статьи.</p>

        <!-- Create button -->
        <button class="btn btn-big" @click="clickHandler()">
            Создать категорию
            <img class="vertical-center" src="svg/plus.svg">
        </button>

    </div>
</template>

<script>
export default {

    methods: {
        clickHandler() {
            this.$root.$emit( 'setVisible', { modal: 'modalNew' } );
        }
    }

};
</script>

<style lang="scss">
.empty-box {
    text-align: center;

    .btn-big {
        width: 230px;
    }
}
</style>
