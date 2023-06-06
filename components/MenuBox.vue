<template>
    <div v-clickoutside="awayHandler" class="context-menu">

        <img class="pointer" src="/svg/menu.svg" alt="" @click="toggleMenu()">

        <transition name="menu">
            <ul v-show="menuVisible" class="menu popup">

                <li class="item" @click="$root.$emit( 'setVisible', [ 'ModalChg', true ] )"> Редактировать </li>
                <li class="item" @click="deleteHandler()"> Удалить </li>

            </ul>
        </transition>
    </div>
</template>

<script>
import clickoutside from './_ui/clickoutside';

export default {

    directives: { clickoutside },

    data() {
        return {
            menuVisible: false
        };
    },

    methods: {

        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        },

        awayHandler() {
            this.menuVisible = false;
        },

        editHandler() {
            console.log( 'edit' );
        },

        deleteHandler() {
            console.log( 'delete' );
        }

    }
};
</script>

<style lang="scss">
.context-menu {

    .popup {
        position: absolute;
        transform: translate(-50%);
    }

}

// a.
.menu-enter-active,
.menu-leave-active {
    opacity: 1;
    transition: all 0.2s ease-in-out;
}

.menu-enter,
.menu-leave-to {
    opacity: 0;
}
</style>
