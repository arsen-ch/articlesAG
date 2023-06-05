<template>
    <div>
        <div class="search-bar mb-2">

            <!-- Create button -->
            <button class="btn" @click="$emit( 'category-create' )">
                Создать категорию
                <img class="vertical-center" src="svg/plus.svg"></button>

            <!-- Search field -->
            <x-input />

        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.search-bar {

    display: flex;

    .btn {
        width: 280px;
        margin-right: 16px;
    }
}
</style>
