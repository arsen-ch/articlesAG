<template>
    <transition name="modal">

        <!-- Anchor -->
        <div v-if="isVisible" ref="root" class="dimmer active" :style="{ position: 'fixed' }">

            <!-- Modal window -->
            <div class="modal attached" :class="[ attached ]" @keydown.esc.stop="cancelHandler()">

                <!-- Content -->
                <div class="modal-content"
                     :style="`width: ${width}px; height: ${height}px; padding: ${padding}`">
                    <slot />

                    <!-- Footer -->
                    <div>

                        <hr>
                        <!-- Buttons -->
                        <div class="footer">
                            <button class="btn" @click="applyHandler()">Сохранить</button>
                            <button class="btn inactive" @click="cancelHandler()">Отмена</button>
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
        attached: { type: String, default: 'center' },
        padding: { type: String, default: '32px' },
        visible: { type: Boolean, default: true },
        width: { type: [ Number, String ], default: 760 },
        height: { type: [ Number, String ], default: 530 }
    },

    data() {
        return {
            isVisible: false
        };
    },

    mounted() {
        // this.$refs.root.$el.focus();
    },

    methods: {

        applyHandler() {

            const ctx = this.$slots.default[ 0 ].context;
            ctx.apply();

            // Close
            this.cancelHandler();

        },

        cancelHandler() {

            this.isVisible = false;

            // Close
            const ctx = this.$slots.default[ 0 ].context;
            ctx.clear();

        },

        setVisible( arg = true ) {
            this.isVisible = arg;
        }
    }
};

</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

.modal {

    border-radius: $border-radius;
    z-index: 999;

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

    .controls {

        display: flex;
        flex-direction: column;
    }

    .footer {

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
</style>