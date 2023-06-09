export function flatDict( entries, categories, filterString ) {

    // Sort
    entries = entries.sort( ( a, b ) => b[ 1 ].timestamp - a[ 1 ].timestamp );
    entries = filterDict( entries, filterString );

    const content = {};
    const registry = {};

    // #1 pass
    const excluded = [];
    for ( const [ key, category ] of entries ) {

        if ( !category.parent ) {
            content[ key ] = { main: Object.values( category.articles ), subs: {} };
        } else {
            excluded.push( [ key, category ] );
        }

        // Articles invert
        for ( const id of Object.keys( category.articles ) ) {
            registry[ id ] = registry[ id ] || [];
            registry[ id ].push( key );
        }

    }

    // #2 pass
    if ( filterString === '' ) {
        for ( const [ key, category ] of excluded ) {
            content[ category.parent ].subs[ key ] = Object.values( categories[ key ].articles );
        }
    }

    return { content, registry };

}

export function filterDict( entries, str, field = 'title' ) {

    if ( str === '' ) { return entries; }

    const filtered = [];
    for ( const [ key, val ] of entries ) {

        const _ = Object.entries( val.articles ).filter( ( [ _, article ] ) => {
            return ( article[ field ].toLowerCase() ).includes( str.toLowerCase() );
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
