<template>
    <div>

        <!-- Main entries ----- to comp / slot? -->
        <div v-for="[ category, val ] in content" :key="category">

            <x-collapse :index="0" :category="category" :capacity="val.main.length">

                <!-- Cards -->
                <div class="row">
                    <div v-for="entry in val.main" :key="entry.timestamp" class="col-4">
                        <card :category="category" :entry="entry" class="mb-x" />
                    </div>
                </div>

            </x-collapse>

            <!-- Subs entries -->
            <div v-for="(arr, subcategory) in val.subs" :key="subcategory">

                <x-collapse :index="1" :category="subcategory" :capacity="arr.length" is-sub>

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

<script>
export default {
    props: {
        content: { type: Array, default: () => { } }
    }
};
</script>
