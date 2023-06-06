export function flatDict( entries, categories ) {

    // Sort
    entries = entries.sort( ( a, b ) => b[ 1 ].timestamp - a[ 1 ].timestamp );

    const result = {};

    // #1 pass
    const excluded = [];
    for ( const [ key, category ] of entries ) {

        if ( !category.parent ) {
            result[ key ] = { main: Object.values( category.articles ), subs: {} };
        } else {
            excluded.push( [ key, category ] );
        }

    }

    // #2 pass
    for ( const [ key, category ] of excluded ) {
        result[ category.parent ].subs[ key ] = Object.values( categories[ key ].articles );
    }

    // #3 pass
    // const sorted = Object.keys( result ).sort().reduce( ( obj, key ) => {
    //     obj[ key ] = result[ key ]; return obj;
    // }, {} );

    return result;

}

export function filterDict( entries, str, field = 'title' ) {

    const filtered = [];
    for ( const [ key, val ] of entries ) {

        const _ = Object.entries( val.articles ).filter( ( [ _, article ] ) => {
            return article[ field ] === str;
        } );

        filtered.push( [ key, { parent: val.parent, articles: Object.fromEntries( _ ) } ] );

    }

    return filtered;

};

export function childReplace( children, oKey, nKey ) {
    children.splice( children.indexOf( oKey ), 1 );
    if ( nKey ) { children.push( nKey ); }
}

export function forKey( state, children, val ) {
    for ( const child of children ) {
        state.categories[ child ].parent = val;
    }
};

export function filterList( list ) {
    return list.filter( ( word ) => {
        return word.toLowerCase().includes( this.searchString.toLowerCase() );
    } );
}
