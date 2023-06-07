import { flatDict, forKey, childReplace } from './utils';
import { fetchedData, sample } from '~/assets/data/data.js';

export const state = () => ( {

    articles: fetchedData,

    categories: sample,
    registry: {},
    content: [],

    isLoading: false

} );

export const actions = {

    // write( { commit }, key ) {
    //     // commit( 'addCategory' )
    //     // commit( 'addArticles' )
    // }

};

export const mutations = {

    // init( state ) { },

    addCategory( state, { key, parent } ) {

        // Check order
        parent = parent || null;
        if ( parent ) {

            if ( !state.categories[ parent ]?.parent ) {
                state.categories[ parent ].children.push( key );
            } else {
                parent = null;
            }

        }

        // New entry
        const entry = { parent, children: [], articles: {}, timestamp: new Date().getTime() };
        this._vm.$set( state.categories, key, entry );

    },

    renameCategory( state, { oKey, nKey } ) {

        if ( oKey === nKey ) { return; }

        const old = state.categories[ oKey ];
        if ( old.parent ) {
            childReplace( state.categories[ old.parent ].children, oKey, nKey );
        }

        forKey( state, old.children, nKey );

        this._vm.$set( state.categories, nKey, old );
        this._vm.$delete( state.categories, oKey );

    },

    delCategory( state, key ) {

        const children = state.categories[ key ].children;
        forKey( state, children, null );

        this._vm.$delete( state.categories, key );

    },

    //

    addArticle( state, { key, article } ) {

        if ( !state.categories[ key ] ) { return; }
        this._vm.$set( state.categories[ key ].articles, article.id, article );

    },

    addArticles( state, { key, articles } ) {

        if ( !state.categories[ key ] ) { return; }
        for ( const article of Object.values( articles ) ) {
            this._vm.$set( state.categories[ key ].articles, article.id, article );
        }

    },

    addArticleToCategories( state, { keys, article } ) {

        for ( const key of keys ) {
            if ( !state.categories[ key ] ) { continue; }
            this._vm.$set( state.categories[ key ].articles, article.id, article );
        }

    },

    delArticle( state, { key, articleId } ) {

        if ( !state.categories[ key ] ) { return; }
        this._vm.$delete( state.categories[ key ].articles, articleId );

    },

    delArticleFromCategories( state, { keys, articleId } ) {

        for ( const key of keys ) {
            if ( !state.categories[ key ] ) { continue; }
            this._vm.$delete( state.categories[ key ].articles, articleId );
        }

    },

    updArticles( state, { key, articles } ) {

        if ( !state.categories[ key ] ) { return; }
        this._vm.$set( state.categories[ key ], 'articles', articles );

    },

    //

    changeParent( state, { key, newParent } ) {

        const item = state.categories[ key ];

        if ( !item || item.parent === newParent || key === newParent ) { return; }
        const notFirst = state.categories[ newParent ]?.parent ?? false;
        const children = item.children.length > 0;

        if ( notFirst || children ) { return; }

        if ( item.parent ) {
            childReplace( state.categories[ item.parent ].children, key );
        }

        // Set
        state.categories[ newParent ].children.push( key );
        this._vm.$set( state.categories[ key ], 'parent', newParent );

    },

    addLike( state, { key, id } ) {

        const entry = state.categories[ key ];
        const likes = entry.articles[ id ].likes;

        this._vm.$set( entry.articles[ id ], 'likes', likes + 1 );

    },

    //

    setContent( state ) {

        const entries = Object.entries( state.categories );
        const { registry, content } = flatDict( entries, state.categories );

        this._vm.$set( state, 'registry', registry );
        this._vm.$set( state, 'content', content );

    }

};

export const getters = {

    getArticlesData( state ) {
        return state.articles;
    },

    getArticle( state ) {
        return ( key ) => {
            return state.registry[ key ] || [];
        };
    },

    getArticles( state ) {
        return state.registry;
    },

    getContent( state ) {
        return state.content;
    },

    getCategories( state ) {
        return Object.keys( state.categories );
    }

};
