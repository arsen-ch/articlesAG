<template>
    <div>

        <!-- Main entries -->
        <div v-for="(val, category) in $store.getters.getContent" :key="category">

            <!-- Title -->
            <div class="level mt-1 mb-x">

                <div class="level-side">
                    <h1 class="title">{{ category }}</h1>
                </div>

                <div class="level-side">
                    <menu-box />
                </div>
            </div>

            <div class="row">
                <div v-for="entry in val.main" :key="entry.id" class="col-4">
                    <card :category="category" :entry="entry" class="mb-x" />
                </div>
            </div>

            <!-- Subs entries -->
            <div v-for="(arr, subcategory) in val.subs" :key="arr.id">

                <!-- Subtitle -->
                <div class="level mt-1 mb-x">

                    <div class="level-side">
                        <h2 class="subtitle">{{ subcategory }}</h2>
                    </div>

                    <div class="level-side">
                        <menu-box />
                    </div>
                </div>

                <div class="row">
                    <div v-for="entry in arr" :key="entry.id" class="col-4">
                        <card :category="subcategory" :entry="entry" class="mb-x" />
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {};
</script>

<!-- <style lang="scss">
.grid {}
</style> -->
