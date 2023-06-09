<template>
    <div v-clickoutside="awayHandler"
         :class="[ 'select', { 'active': visible, 'disabled': disabled } ]"
         :style="`min-width: ${width}px`"
         @click="clickHandler"
         @mouseover="showClear = true"
         @mouseout="showClear = false">

        <!-- Search -->
        <input ref="searchInput"
               autocomplete="off"
               @input.stop="searchInputHandler( $event.target.value )"
               @keydown.enter="$emit( 'enter' )" />

        <!--  Text -->
        <div :class="[ 'text', { 'hint': ( !preselect && !selectedItem ) } ]"
             :style="{ visibility: showText ? 'visible' : 'hidden' }">
            {{ ( selectedItem && selectedItem.content ) || ( preselect || hint ) }}

            <div class="icon"><img class="rotate0" :class="{ rotate180: visible }" src="/svg/chevron-down.svg" alt=""></div>

        </div>

        <!-- Options -->
        <ul v-show="visible && $slots.default"
            class="menu vertical"
            @click.stop="changeHandler( $event.target.__vue__ )"
            @mouseover.stop="() => { }"
            @mouseout.stop="() => { }">
            <slot></slot>
        </ul>

    </div>
</template>

<script>
import clickoutside from './clickoutside';

export default {

    directives: { clickoutside },

    props: {
        id: { type: String, default: '' },
        hint: { type: String, default: '' },
        width: { type: Number, default: 160 },
        disabled: { type: Boolean, default: false },
        preselect: { type: [ String, Number, null ], default: null }
    },

    data() {
        return {
            visible: false,
            showText: true,
            showClear: false,
            selectedItem: null,
            reRenderChildren: false,
            keyChildrenIndex: -1
        };
    },

    watch: {
        visible() {
            this.$emit( 'visible', { id: this.id, visible: this.visible } );
        }
    },

    methods: {

        searchInputHandler( v ) {

            if ( !/^\s+$/.test( v ) ) {

                this.displayItems = [];
                this.$children.forEach( ( ele ) => {
                    if ( ele.content.toLowerCase().startsWith( v.toLowerCase() ) ) {
                        ele.$el.style.display = 'block';
                        this.displayItems.push( ele );
                    } else {
                        ele.$el.style.display = 'none';
                    }
                } );

                this.keyChildrenIndex = -1;
                this.showText = false;
                this.multipleInputWidth = v.length > 0 ? v.length : 1;

            } else {

                this.showText = true;
                this.displayItems = this.$children;
                this.multipleInputWidth = 1;

            }
        },

        clickHandler() {
            this.visible = !this.visible;
        },

        changeHandler( comp ) {

            if ( !comp ) { return; }

            this.selectedItem = comp;
            this.emitChange( [ comp.index ] );
            this.awayHandler();

        },

        emitChange( values ) {

            const v = values[ 0 ];
            this.$emit( 'input', v );
            this.$emit( 'change', v );

        },

        awayHandler() {

            this.visible = false;
            this.resetValues();

        },

        resetValues() {

            this.showText = true;
            this.reRenderChildren = true;
            this.keyChildrenIndex = -1;
            this.$refs.searchInput.value = '';

        }
    }
};
</script>

<style lang="scss">
.select {
    width: 100%;
    height: 46px;
}
</style>
