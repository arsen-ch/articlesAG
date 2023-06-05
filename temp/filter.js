const dists = [
    {
        dept_id: 1,
        dept: {
            name: 'finance',
            employees: [ {
                emp_id: 1,
                name: 'John',
                address: [ {
                    country: 'US',
                    state: 'NC'
                } ]
            } ]
        }
    },
    {
        dept_id: 2,
        dept: {
            name: 'marketing',
            employees: [ {
                emp_id: 2,
                name: 'David',
                address: [ {
                    country: 'US',
                    state: 'NY'
                } ]
            } ]
        }
    },
    {
        dept_id: 3,
        dept: {
            name: 'sales',
            employees: [ {
                emp_id: 3,
                name: 'Robert',
                address: [ {
                    country: 'US',
                    state: 'NC'
                } ]
            } ]
        }
    } ];

const filter = 'NY';
const res = dists.filter(
    item => item.dept.employees.some(
        employee => employee.address.find( address => address.state === filter )
    )
);
// console.log( res );


const dict = {
    z: {
        parent: null,
        articles: {
            0: {
                id: 0,
                title: 'hello',
                image: '/img',
                texts: 'Hello card',
                likes: 0
            },
            2: {
                id: 2,
                title: 'pictures',
                image: '/img',
                texts: 'Pictures',
                likes: 10
            }
        }
    },
    b: {
        parent: null,
        articles: {}
    }
};

const arr = [
    [
        'z',
        {
            parent: null,
            articles: {
                0: {
                    id: 0,
                    title: 'hello',
                    image: '/img',
                    texts: 'Hello card',
                    likes: 0
                },
                2: {
                    id: 2,
                    title: 'pictures',
                    image: '/img',
                    texts: 'Pictures',
                    likes: 10
                }
            }
        }
    ],
    [
        'b',
        {
            parent: null,
            articles: {}
        }
    ]
];

function fill( obj, predicate ) {

    const result = {}; let key;

    for ( key in obj ) {
        if ( obj[ key ] && !predicate( obj[ key ] ) ) {
            result[ key ] = obj[ key ];
        }
    }

    return result;
};

// console.log( 'fill', fill( arr, ( item ) => {

//     const z = fill( item[ 1 ].articles, ( entry ) => { return entry.id > 0; } );

//     console.log( z );

// } ) );

const tmp = [];
for ( const [ key, val ] of arr ) {

    // console.log( 'key', key );

    // for ( const [ id, article ] of Object.entries( val.articles ) ) {
    //     console.log( id, article );
    // }

    const _ = Object.entries( val.articles ).filter( ( [ _, article ] ) => {
        return article.title === 'hello';
    } );

    tmp.push( [ key, { parent: val.parent, articles: Object.fromEntries( _ ) } ] );

}

console.log( 'tmp', Object.fromEntries( tmp ) );
