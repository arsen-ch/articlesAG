export function flatDict( categories ) {

    const result = {};

    // #1 pass
    const entries = Object.entries( categories );
    const exclude = [];
    for ( const [ key, category ] of entries ) {

        if ( !category.parent ) {
            result[ key ] = { main: Object.values( category.articles ), subs: {} };
        } else {
            exclude.push( [ key, category ] );
        }

    }

    // #2 pass
    for ( const [ key, category ] of exclude ) {
        result[ category.parent ].subs[ key ] = Object.values( categories[ key ].articles );
    }

    return result;

}

export function filterDict( categories ) {
    return 0;
};

export function pageDict( categories ) {
    return 0;
}
