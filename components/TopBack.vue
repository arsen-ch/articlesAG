<template>
    <button class="top-btn"
            @click="clickHandle">
        Очистить сохранения
    </button>
</template>

<script>
export default {

    methods: {

        clickHandle() {
            window.localStorage.clear();
            this.$store.dispatch( 'clrCategories' );
        }

    }
};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

.top-btn {
    transition: all 0.4s ease-in-out;
    border-radius: 5px;
    color: white;
    background-color: rgba($color-primary, 1);
    padding: 5px 10px;

    position: fixed;
    bottom: 20px;
    right: 30px;
    border: none;
    outline: none;

    cursor: pointer;
    pointer-events: all;

    opacity: 1;
    z-index: 99;

    &:hover {
        background-color: $color-accent;
    }

    &.opacity {
        pointer-events: none;
        opacity: 0;
    }
}
</style>
