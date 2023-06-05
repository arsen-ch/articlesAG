<template>
    <div v-clickoutside="awayHandler"
         :class="[ 'select', { 'active': visible, 'disabled': disabled } ]"
         :style="`min-width: ${width}px`"
         @click="clickHandler"
         @mouseover="showClear = true"
         @mouseout="showClear = false">

        <!-- <i :class="iconDownArrow" /> -->

        <!-- Search -->
        <input ref="searchInput"
               autocomplete="off"
               @input.stop="searchInputHandler( $event.target.value )" />

        <!-- Text -->
        <div :class="[ 'text', { 'hint': valueEmpty } ]"
             :style="{ visibility: showText ? 'visible' : 'hidden' }">
            {{ selectedItems.length > 0 && selectedItems[ 0 ].content || hint }}
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
        value: { type: [ Number, String, Array ], default: '' },
        hint: { type: String, default: '' },
        width: { type: Number, default: 160 },
        disabled: { type: Boolean, default: false }
    },

    data() {
        return {
            visible: false,
            selectedItems: [],
            showText: true,
            reRenderChildren: false,
            showClear: false,
            displayItems: [],
            keyChildrenIndex: -1
        };
    },

    computed: {

        valueEmpty() {
            return this.values.length === 0;
        },

        values() {
            return Array.isArray( this.value )
                ? this.value
                : ( this.value && this.value.toString() !== ''
                    ? [ this.value ]
                    : [] );
        }
    },

    watch: {
        value( _n, _o ) {
            this.initData();
        },

        visible() {
            this.$emit( 'visible', { id: this.id, visible: this.visible } );
        }
    },

    mounted() {
        this.initData();
    },

    methods: {

        initData() {

            this.selectedItems = [];
            this.$children.forEach( ( el ) => {
                el.$el.style.display = 'block';
                if ( this.values.includes( el.index ) ) {
                    el.active = true;
                    this.selectedItems.push( el );
                } else {
                    el.active = false;
                }
            } );

            this.displayItems = this.$children;
        },

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

            this.selectedItems.splice( 0, 1, comp );
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
