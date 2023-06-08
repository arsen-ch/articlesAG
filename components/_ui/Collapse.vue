<template>
    <div class="collapse">

        <div :class="[ 'item', { 'active': show } ]">

            <div class="caption">

                <div class="level mt-1 mb-x">

                    <div class="level-side">
                        <div class="level-item" @click="clickHandler">
                            <h1 :class="[ isSub ? 'subtitle' : 'title' ]">{{ category }}</h1><span>{ {{ capacity }} }</span>
                        </div>
                    </div>

                    <div class="level-side">
                        <img class="rotate0" src="/svg/chevron-down.svg" alt="" @click="clickHandler">
                        <menu-box :category="category" />
                    </div>

                </div>

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
        active: { type: Boolean, default: true },
        category: { type: Object, default: () => { } },
        capacity: { type: Number, default: 0 },
        isSub: { type: Boolean, default: false }
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
