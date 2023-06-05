import { flatDict } from './utils';
import { fetchedData } from '~/assets/data.js';

export const state = () => ( {

    articles: fetchedData,
    isLoading: false,
    categories: {}

} );

export const actions = {
    nuxtServerInit( { commit } ) {
        commit( 'Init', {} );
    }
};

export const mutations = {

    init( state ) {
        state.articles = {};
    },

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

    getCategories( state ) {
        const flat = flatDict( state.categories );
        return flat;
    },

    getArticles( state ) {
        return state.articles;
    }

};