<template>
    <modal @close-modal="showModal = false">

        <!-- Content -->
        <div>
            <h3 class="title my-x">Новая категория </h3>
            <div class="menu">
                <field holder="Название" :show-icon="false" />
                <selection holder="Название"/>
            </div>
        </div>

        <!-- Footer -->
        <div>
            <hr>
            <div class="footer">
                <button class="btn">Сохранить</button>
                <button class="btn inactive">Отмена</button>
            </div>
        </div>

    </modal>
</template>

<script>
export default {

    props: {

    },

    methods: {
        closeHandler() {
            this.$emit( 'close-modal' );
        }
    }
};

</script>

<style lang="scss">
.menu {
    & :not(:last-child) {
        margin-bottom: 4px;
    }
}

.footer {

    display: flex;
    justify-content: space-between;

    & .btn {
        width: 48%;
    }
}
</style>
