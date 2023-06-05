<template>
    <div>

        <!-- Main entries -->
        <div v-for="(val, category) in $store.getters.getContent" :key="category">

            <h1 class="title">{{ category }}</h1>

            <div class="row">
                <div v-for="entry in val.main" :key="entry.id" class="col-4">
                    <card :entry="entry" />
                </div>
            </div>

            <!-- Subs entries -->
            <div v-for="(arr, subcategory) in val.subs" :key="arr.id">

                <h2 class="subtitle">{{ subcategory }}</h2>

                <div class="row">
                    <div v-for="entry in arr" :key="entry.id" class="col-4">
                        <card :entry="entry" />
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {};
</script>
