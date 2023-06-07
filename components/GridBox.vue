<template>
    <div>

        <!-- Main entries -->
        <div v-for="(val, category) in $store.getters.getContent" :key="category">

            <x-collapse :index="0">

                <!-- Title -->
                <template #title="{ handler }">

                    <div class="level mt-1 mb-x">

                        <div class="level-side">
                            <div class="level-item" @click="handler">
                                <h1 class="title">{{ category }}</h1><span>{ {{ val.main.length }} }</span>
                            </div>
                        </div>

                        <div class="level-side">
                            <img class="rotate0" src="/svg/chevron-down.svg" alt="" @click="handler">
                            <menu-box :category="category" />
                        </div>

                    </div>
                </template>

                <!-- Cards -->
                <div class="row">
                    <div v-for="entry in val.main" :key="entry.timestamp" class="col-4">
                        <card :category="category" :entry="entry" class="mb-x" />
                    </div>
                </div>

            </x-collapse>

            <!-- Subs entries -->
            <div v-for="(arr, subcategory) in val.subs" :key="subcategory">

                <x-collapse :index="1">

                    <!-- Subtitle -->
                    <template #title="{ handler }">
                        <div class="level mt-1 mb-x">

                            <div class="level-side">
                                <div class="level-item" @click="handler">
                                    <h2 class="subtitle">{{ subcategory }}</h2><span>{ {{ arr.length }} }</span>
                                </div>
                            </div>

                            <div class="level-side">
                                <img class="rotate0" src="/svg/chevron-down.svg" alt="" @click="handler">
                                <menu-box :category="subcategory" />
                            </div>
                        </div>
                    </template>

                    <!-- Cards -->
                    <div class="row">
                        <div v-for="entry in arr" :key="entry.timestamp" class="col-4">
                            <card :category="subcategory" :entry="entry" class="mb-x" />
                        </div>
                    </div>

                </x-collapse>
            </div>

        </div>
    </div>
</template>
