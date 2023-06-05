<template>
    <section>
        <card />
        <temp />
    </section>
</template>

<script>
export default {
    name: 'IndexPage'
};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

html {
    word-spacing: $word-spacing;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

body {
    color: $color-body-fg;
    background: $color-body-bg;

    font-family: $font-body;
    font-size: $font-base-size;
    // font-weight: $font-base-weight;
    // line-height: $font-leading;
}
</style>
