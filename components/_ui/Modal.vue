<template>
    <div class="dimmer active"
         :style="{ position: 'fixed' }">

        <div ref="modal"
             tabindex="0"
             class="modal attached"
             :class="[ attached ]"
             @keydown.esc.stop="closeHandler">

            <!-- Content -->
            <div class="modal-content" :style="`width: ${width}px; height: ${height}px; padding: ${padding}`">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        attached: { type: String, default: 'center' },
        padding: { type: String, default: '32px' },
        visible: { type: Boolean, default: true },
        width: { type: [ Number, String ], default: 760 },
        height: { type: [ Number, String ], default: 530 }
    },

    watch: {
        visible() {
            if ( this.visible ) {
                this.$refs.info.focus();
            }
        }
    },

    mounted() {
        this.$refs.modal.focus();
    },

    methods: {
        closeHandler() {
            this.$emit( 'close-modal' );
        }
    }
};

</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

.modal {

    border-radius: $border-radius;
    z-index: 9999;

    &.attached.center {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    &-content {

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        text-align: left;
        background: white;
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }

    &:focus {
        outline: $color-primary;
    }
}
</style>
