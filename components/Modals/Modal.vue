<template>
    <div class="dimmer active"
         :style="{ position: 'fixed' }">

        <div ref="modal"
             tabindex="0"
             class="modal attached"
             :class="[ attached ]"
             :style="`width: ${width}px; height: ${height}`"
             @keydown.esc.stop="closeHandler">

            <!-- Header -->
            <div class="header level" :style="{ padding }">
                <div class="level-side">
                    <div class="level-item">
                        <div v-if="title">{{ title }}</div>
                    </div>
                </div>

                <div class="level-side">
                    <div class="level-item">
                        <div class="close-button">
                            <i class="las la-2x la-times-circle" @click="closeHandler" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="content" :style="{ padding: padding * 2 }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        title: { type: String, default: 'Информация' },
        attached: { type: String, default: 'center' },
        padding: { type: String, default: '10px' },
        visible: { type: Boolean, default: false },
        width: { type: [ Number, String ], default: 850 },
        height: { type: [ Number, String ], default: 500 }
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

    &>.header {
        border-bottom: 1px solid rgba(34, 36, 38, 0.15);
        border-radius: $border-radius $border-radius 0 0;
        background: #f8f8f9;
        font-weight: bold;
    }

    &.attached.center {
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    &:focus {
        outline: $color-primary;
    }
}

// a.
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: scale(1.03);
}
</style>
