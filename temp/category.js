const categories = {};
const articles = [
    {
        id: 0,
        title: 'hello',
        image: '/img',
        texts: 'Hello card',
        likes: 0
    },
    {
        id: 1,
        title: 'master',
        image: '/img',
        texts: 'Card master',
        likes: 0
    },
    {
        id: 2,
        title: 'pictures',
        image: '/img',
        texts: 'Pictures',
        likes: 10
    },
    {
        id: 3,
        title: 'hello111',
        image: '/img',
        texts: '111Hello card',
        likes: 0
    }
];

const t = {
    cat: {
        sub1: {},
        sub: {
            0: {
                id: 0,
                title: 'hello',
                image: '/img',
                texts: 'Hello card',
                likes: 0
            }
        },
        all: []
    },
    cat2: {

    }
};

const t2 = {
    cat1: {
        parent: null,
        articles: {
            0: {
                id: 0,
                title: 'hello',
                image: '/img',
                texts: 'Hello card',
                likes: 0
            },
            1: {}
        }
    },
    cat2: {
        parent: 'cat1',
        articles: {
            10: {},
            20: {}
        }
    },
    cat3: {
        parent: 'cat2',
        articles: {
            100: {},
            200: {},
            300: {}
        }
    }
};

// const structV1 = {
//     cat: {
//         sub: {
//             art: 0
//         }
//     }
// };

// const strucV2 = {
//     cat: {
//         child: 'sub',
//         art: 0
//     }

// };

function flatStruct( struct ) {

    const result = {};
    for ( const [ key, category ] of Object.entries( struct ) ) {

        if ( !category.parent ) {
            result[ key ] = { all: category.articles };
        } else if ( result[ category.parent ] ) {
            result[ category.parent ][ key ] = t2[ key ].articles;
        } else {
            result[ key ] = { all: category.articles };
        }

    }

    return result;
}

console.log( flatStruct( t2 ) );

console.log( 'Object.fromE', Object.fromEntries( Object.entries( t2 ) ) );

const z = ( obj, predicate ) =>
    Object.fromEntries( Object.entries( obj ).filter( predicate ) );

console.log( 'z', z( t2, ( item ) => { return item[ 1 ].parent === 'cat1'; } ) );
