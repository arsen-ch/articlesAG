<template>
    <div class="collapse">

        <div :class="[ 'item', { 'active': show } ]">

            <div class="caption">
                <slot name="title" :handler="clickHandler"></slot>
            </div>

            <transition name="fade">
                <div v-show="show">
                    <slot></slot>
                </div>
            </transition>

        </div>

    </div>
</template>

<script>
export default {

    props: {
        index: { type: [ String, Number ], default: 0, required: true },
        active: { type: Boolean, default: true }
    },

    data() {
        return {
            show: this.active
        };
    },

    methods: {

        clickHandler() {
            this.show = !this.show;
            this.$emit( 'click', this.index, this.show );
        }

    }

};
</script>
