<template>
    <transition name="modal">

        <!-- Anchor -->
        <div v-if="isVisible" class="dimmer active" :style="{ position: 'fixed' }" @keydown.esc.stop="cancelHandler()">

            <!-- Modal Window -->
            <div class="modal">

                <!-- Content -->
                <div class="modal-content"
                     :class="{ 'modal-error': error }"
                     :style="`width: ${width}px; height: ${height}px; padding: ${padding}`">

                    <!-- Slot -->
                    <div>
                        <slot />
                    </div>

                    <!-- Footer -->
                    <div>

                        <hr>
                        <!-- Buttons -->
                        <div class="modal-footer">
                            <button class="btn" @click="applyHandler()">{{ captions.apply }}</button>
                            <button class="btn inactive" @click="cancelHandler()">{{ captions.cancel }}</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
export default {

    props: {
        captions: {
            type: Object,
            default: () => { return { apply: 'Сохранить', cancel: 'Отмена' }; }
        },
        padding: { type: String, default: '32px' },
        visible: { type: Boolean, default: true },
        width: { type: [ Number, String ], default: 760 },
        height: { type: [ Number, String ], default: 530 }
    },

    data() {
        return {
            isVisible: false,
            error: false,
            arg: null
        };
    },

    watch: {

        isVisible() {
            const ctx = this.$slots.default[ 0 ].context;
            ctx.setContext( this.arg );
        }

    },

    methods: {

        show( arg ) {
            this.isVisible = true;
            this.arg = arg;
        },

        close() {
            this.isVisible = false;
            this.arg = null;
        },

        applyError() {

            // a.
            if ( !this.error ) {
                this.error = true;
                setTimeout( () => { this.error = false; }, 1000 );
            }

        },

        applyHandler() {

            const ctx = this.$slots.default[ 0 ].context;
            ctx.apply();

            // Close
            this.cancelHandler();

        },

        cancelHandler() {

            const ctx = this.$slots.default[ 0 ].context;
            ctx.clear();

            // Close
            this.close();

        }
    }

};

</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

$error-border: 2px;

.modal {

    border-radius: $border-radius;

    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    z-index: 999;

    &-content {

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        background: white;
        border: $error-border solid rgba(0, 0, 0, 0);
        border-radius: 10px;

        text-align: left;
        width: 100%;
        height: 100%;
    }

    &-footer {

        display: flex;
        justify-content: space-between;

        & .btn {
            width: 48%;
        }
    }

    &:focus {
        outline: $color-primary;
    }
}

// a.
.modal-enter-active,
.modal-leave-active {
    opacity: 1;
    transition: all 0.35s ease-in-out;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.05);
}

// a.
.modal-error {
    animation: horizontal-shaking 0.8s ease-in-out both, red-border 0.8s ease-in-out both;
}

@keyframes horizontal-shaking {
    0% {
        transform: translateX(0)
    }

    25% {
        transform: translateX(5px)
    }

    50% {
        transform: translateX(-5px)
    }

    75% {
        transform: translateX(5px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes red-border {

    0% {
        border-color: rgba(0, 0, 0, 0);
    }

    50% {
        border-color: rgb(255, 0, 0);
    }

    100% {
        border-color: rgba(0, 0, 0, 0);

    }
}
</style>
