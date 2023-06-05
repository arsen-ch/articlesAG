<template>
    <div>
        <div class="controls mb-2">

            <!-- Create button -->
            <button class="btn" @click="$emit( 'category-create' )">
                Создать категорию
                <img class="vertical-center" src="svg/plus.svg"></button>

            <!-- Search field -->
            <field />

        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.controls {
    display: flex;
    .btn {
        width: 280px;
        margin-right: 16px;
    }
}
</style>
