export function flatDict( entries, categories ) {

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

export function pageDict( categories ) {
    return 0;
}

export function filterList( list ) {
    return list.filter( ( word ) => {
        return word.toLowerCase().includes( this.searchString.toLowerCase() );
    } );
}
