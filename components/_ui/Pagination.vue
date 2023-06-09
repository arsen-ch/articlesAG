<template>
    <div v-if="total > 0" class="pagination">
        <ul>

            <!-- Total counter-->
            <!-- <li class="item total">{{ totalCounter }}</li> -->

            <!-- Prev button -->
            <li :class="[ 'item', { 'disabled': current <= 0 } ]" @click.stop.prevent="prevHandler">
                <img src="/svg/left.svg" alt="">
            </li>

            <!-- First -->
            <li :class="[ 'item', { 'active': current === 1 } ]" @click.stop.prevent="firstHandler">1</li>

            <template v-for="i in pages">
                <li v-if="inFive( i )"
                    :key="i"
                    :class="[ 'item', { 'active': current == i } ]"
                    @click.stop.prevent="clickHandler( i )">
                    {{ i }}
                </li>
            </template>

            <li v-if="pages > 5 && ( pages - current ) > 3" class="item disabled">...</li>

            <!-- Last -->
            <li v-if="pages > 1"
                :class="[ 'item', { 'active': current === pages } ]"
                @click.stop.prevent="lastHandler">{{ pages }}</li>

            <!-- Next buttons -->
            <li :class="[ 'item', { 'disabled': current >= pages } ]" @click.stop.prevent="nextHandler">
                <img src="/svg/right.svg" alt="">
            </li>

        </ul>
    </div>
</template>

<script>
export default {

    props: {
        current: { type: [ Number, String ], default: 1 },
        rows: { type: Number, default: 5 },
        total: { type: Number, required: true }
    },

    data() {
        return {};
    },

    computed: {

        // totalCounter() {
        //     const range = [ this.current * this.rows + 1, ( this.current * this.rows ) + this.rows ];
        //     return `${range[ 0 ]}-${range[ 1 ]} / ${this.total}`;
        // },

        pages() {
            return Math.ceil( this.total / this.rows );
        }
    },

    methods: {

        clickHandler( index ) {
            if ( index !== this.current ) {
                this.$emit( 'change', index );
            }
        },

        firstHandler() {
            if ( this.current > 0 ) {
                this.$emit( 'change', 1 );
            }
        },

        lastHandler() {
            if ( this.current < this.pages ) {
                this.$emit( 'change', this.pages );
            }
        },

        prevHandler() {
            if ( this.current > 1 ) {
                this.$emit( 'change', this.current - 1 );
            }
        },

        nextHandler() {
            if ( this.current < this.pages ) {
                this.$emit( 'change', this.current + 1 );
            }
        },

        inFive( index ) {

            if ( index > 1 && index < this.pages ) {

                let before = this.current - 2;
                if ( this.current > this.pages - 3 ) {
                    before = this.current - 4;
                } else if ( this.current > this.pages - 4 ) {
                    before = this.current - 3;
                }

                let after = this.current < 4 ? this.current + 3 : this.current + 2;

                if ( before <= 0 ) {
                    after -= before - 1;
                }

                if ( after >= this.pages ) {
                    before -= after - this.pages;
                    after = index;
                }

                if ( before <= index && after >= index ) {
                    return true;
                }

                return false;
            }

            return false;
        }
    }
};
</script>
