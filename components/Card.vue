<template>
    <div>
        <div class="card">
            <div class="card-content">

                <!-- Likes -->
                <div class="card-info mt-0 mb-x">
                    <div class="level">

                        <!-- Like -->
                        <div class="level-side">

                            <div class="level-item">
                                <img src="/svg/like-active.svg" alt="Подобайка" @click="addLike()" />{{ entry.likes }}
                            </div>
                        </div>

                        <!-- Pen -->
                        <div class="level-side">

                            <div class="level-item">
                                <img :src="'/svg/pen.svg'" alt="Редактирование" @click="editCard()" />
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Image -->
                <div class="card-image">
                    <img :src="'/img/thumbs/1-1.jpg'" alt="Изображение статьи" />
                    <div class="card-image-fill" :style="{ backgroundImage: `url(${entry.image})` }" />
                </div>

                <!-- Title -->
                <h6 class="card-title mb-0 mt-x">{{ entry.title }}</h6>
                <p class="card-description mt-x my-0">{{ entry.texts }}</p>
            </div>
        </div>

    </div>
</template>

<script>

export default {

    props: {
        entry: {
            type: Object,
            default: () => {
                return {
                    image: 'img/card-bg.jpg',
                    title: 'Тестовая карточка',
                    texts: 'Описание тестовой карточки',
                    likes: 777
                };
            }
        }
    },

    methods: {

        addLike() {
            console.log( 'like it' );
        },

        editCard() {
            console.log( 'edit it' );
        }
    }

};
</script>

<style lang="scss">
@import "~/assets/styles/vars.scss";

.card {

    width: 290px;
    height: 295px;

    background: white;
    border: $border;
    border-radius: $border-radius;

    &-content {
        padding: 15px;
    }

    &-info {
        color: $color-dimmer;
        font-size: 12px;

        img {
            cursor: pointer;
        }
    }

    &-image {

        position: relative;
        overflow: hidden;

        &-fill {

            transition: all 0.3s ease;

            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }
        }

        & img {
            height: 80px;
        }
    }

    &-title {
        color: $color-title;
        font-size: 16px;
        font-weight: 800;
    }

    &-description {
        font-size: 13px;
    }

}
</style>
