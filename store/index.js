import { flatDict, forKey, childReplace } from './utils';
import { fetchedArticles, samplesCategories } from '~/assets/data/data.js';

function withUpdate( commit, actions ) {

    for ( const { act, arg } of actions ) {
        commit( act, arg );
    }

    // Set content
    commit( 'setContent' );
}

export const state = () => ( {

    articles: fetchedArticles,

    categories: {},
    registry: {},
    content: [],

    filterString: '',
    isLoading: true

} );

export const actions = {

    search( { commit }, key ) {
        withUpdate( commit, [ { act: 'setValue', arg: { field: 'filterString', val: key } } ] );
    },

    addCategory( { commit }, { key, parent } ) {
        withUpdate( commit, [ { act: 'addCategory', arg: { key, parent } } ] );
    },

    delCategory( { commit }, key ) {
        withUpdate( commit, [ { act: 'delCategory', arg: key } ] );
    },

    addArticles( { commit }, { key, parent, articles } ) {
        withUpdate( commit, [
            { act: 'addCategory', arg: { key, parent } },
            { act: 'addArticles', arg: { key, articles } } ]
        );
    },

    movArticle( { commit }, { catDif, articleId, catAdd, article } ) {
        withUpdate( commit, [
            { act: 'delArticleFromCategories', arg: { keys: catDif, articleId } },
            { act: 'addArticleToCategories', arg: { keys: catAdd, article } } ]
        );
    },

    updArticles( { commit }, { key, oKey, parent, articles } ) {
        withUpdate( commit, [
            { act: 'renameCategory', arg: { oKey, nKey: key } },
            { act: 'changeParent', arg: { key, newParent: parent } },
            { act: 'updArticles', arg: { key, articles } } ]
        );
    },

    clrCategories( { commit } ) {
        withUpdate( commit, [ { act: 'setValue', arg: { field: 'categories', val: {} } }, ]
        );
    }

};

export const mutations = {

    // init( state ) { },

    addCategory( state, { key, parent } ) {

        if ( key in state.categories ) { return; }

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

    //

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

    setLoading( state, arg ) {
        state.isLoading = arg;
    },

    setContent( state ) {

        const entries = Object.entries( state.categories );
        const { registry, content } = flatDict( entries, state.categories, state.filterString );

        this._vm.$set( state, 'registry', registry );
        this._vm.$set( state, 'content', Object.entries( content ) );

    },

    setValue( state, { field, val } ) {
        state[ field ] = val;
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

    uniqArticles( state ) {

        const content = state.content;
        const articles = content.map( ( [ _, { main, subs } ] ) => {
            return [
                ...main.map( ( item ) => { return { ...item, category: _ }; } ),
                ...Object.values( subs ).map( ( item ) => { return { ...item, category: _ }; } ) ];
        } );

        return articles.reduce( ( a, b ) => a.concat( b ), [] );

        // const articles = content.map( ( [ _, { main, subs } ] ) => {
        //     return [ ...main.map( item => item.title ), ...Object.values( subs ).map( item => item.title ) ];
        // } );
        // return [ ...new Set( articles.reduce( ( a, b ) => a.concat( b ), [] ) ) ].filter( item => item );

    },

    getContent( state ) {
        return state.content;
    },

    getCategories( state ) {
        return Object.keys( state.categories );
    },

    getStoreDate( state ) {
        return ( arg ) => { return state[ arg ]; };

    }

};
