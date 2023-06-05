<template>
    <div>
        <div class="card">
            <div class="card-content">

                <!-- Likes -->
                <div class="card-info">
                    <div class="level">

                        <!-- Like -->
                        <div class="level-side">

                            <div class="level-item">
                                <img :src="'/svg/like-active.svg'" alt="Подобайка" />{{ 100 }}
                            </div>
                        </div>

                        <!-- Pen -->
                        <div class="level-side">

                            <div class="level-item">
                                <img :src="'/svg/pen.svg'" alt="Редактирование" />
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Image -->
                <div class="card-image">
                    <img :src="'/img/thumbs/1-1.jpg'" alt="Изображение статьи" />
                    <div class="card-image-fill" :style="{ backgroundImage: `url(img/card-bg.jpg)` }" />
                </div>

                <!-- Title -->
                <h6 class="card-title my-x">title</h6>
                <p class="card-description my-0">desk</p>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
@import "~/assets/styles/vars.scss";

.card {

    width: 290px;
    height: 295px;

    background: white;
    border: $border;
    border-radius: $border-radius;

    &-content {
        padding: 16px;
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
        color: #303446;
        font-size: $font-headings-size;
        font-weight: $font-headings-weight;
    }

    &-description {
        font-size: 13px;
    }

}
</style>
