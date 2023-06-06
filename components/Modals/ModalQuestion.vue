<template>
    <modal ref="xmodal" width="400" height="200" :captions="{ apply: 'Удалить', cancel: 'Отмена' }">

        <div class="text-center">

            <img src="/svg/question-circle.svg" alt="">
            <h3 class="title my-x">{{ title }}</h3>
            <span style="font-size: 14px;">Все дочернии категории также будут удалены</span>

        </div>

    </modal>
</template>

<script>
export default {

    props: {
        title: { type: String, default: '' }
    },

    data() {
        return {
            name: ''
        };
    },

    methods: {

        setContext( arg ) {
            this.name = arg;
        },

        apply() {
            this.$store.commit( 'delCategory', this.name );
        },

        clear() { }
    }
};

</script>
