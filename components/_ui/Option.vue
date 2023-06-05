<template>
    <li :class="classObject" @click="clickHandler">
        <slot>{{ content }}</slot>
    </li>
</template>

<script>
export default {

    props: {
        index: { type: [ String, Number ], required: true },
        disabled: { type: Boolean, default: false },
        content: { type: String, default: '' }
    },

    data() {
        return {
            active: false
        };
    },

    computed: {
        classObject() {
            return [
                'item',
                { active: this.active },
                { disabled: this.disabled }
            ];
        }
    },

    methods: {
        clickHandler( event ) {
            event.index = this.index;
            this.$emit( 'click', event );
        }
    }
};
</script>
