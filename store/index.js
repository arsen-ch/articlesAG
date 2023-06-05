import { flatDict } from './utils';
import { fetchedData, sample } from '~/assets/data/data.js';

export const state = () => ( {

    articles: fetchedData,
    isLoading: false,
    categories: sample // {}

} );

export const actions = {
    nuxtServerInit( { commit } ) {
        commit( 'init', {} );
    }
};

export const mutations = {

    init( state ) { },

    addCategory( state, { key, parent } ) {

        // Check order
        parent = parent || null;
        if ( parent ) {

            if ( !state.categories[ parent ] ) { return; }
            parent = state.categories[ parent ]?.parent ? null : parent;

        }

        // New entry
        const entry = { parent, articles: {} };
        this._vm.$set( state.categories, key, entry );

    },

    delCategory( state, key ) {
        this._vm.$delete( state.categories, key );
    },

    addArticle( state, { key, article } ) {

        if ( !state.categories[ key ] ) { return; }
        this._vm.$set( state.categories[ key ].articles, article.id, article );

    },

    delArticle( state, { key, articleId } ) {
        if ( !state.categories[ key ] ) { return; }
        this._vm.$delete( state.categories[ key ].articles, articleId );
    },

    changeParent( state, { key, parent } ) {

        const item = state.categories[ key ];
        if ( !item ) { return; }

        const hasParent = state.categories[ parent ]?.parent ?? false;
        if ( hasParent ) { return; }

        this._vm.$set( state.categories[ key ], 'parent', parent );

    }

};

export const getters = {

    getContent( state ) {

        const entries = Object.entries( state.categories );
        const flatted = flatDict( entries, state.categories );
        console.log( 'flatted', state.categories );
        return flatted;
    },

    getArticles( state ) {
        return state.articles;
    }

};
