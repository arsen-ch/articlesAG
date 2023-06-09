const titles = [
    'Кричащий заголовок',
    'Новая глава',
    'Успешный успех',
    'Продающая статья',
    'Пустая заметка',
    'Очерк',
    'Нужно лишь только...',
    'Смотреть в будущее',
    'Однажды в..',
    'Важная информация'
];

const script = [
    'Краткое описание',
    'Описание статьи',
    'Подпись к карточке',
    'Очень длинное описание к карточке',
    'Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.'
];

const categories = [
    'Начальная',
    'Вторая',
    'Третья',
    'Четвертая',
    'Последняя',
    'Модная',
    'Молодежная',
    'Летняя'
];

const sample = {
    'Самая большая категория': {
        timestamp: 0,
        parent: null,
        children: [ 'Название подкатегории', 'Подкатегория 2' ],
        articles: {
            0: {
                id: 0,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Краткое описание',
                likes: 90
            },
            1: {
                id: 1,
                title: 'Заголовок!',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 75
            },
            11: {
                id: 11,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.',
                likes: 25
            },
            12: {
                id: 12,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Подпись к карточке',
                likes: 25
            },
            19: {
                id: 19,
                title: 'Заголовок!',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 75
            },
            15: {
                id: 15,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Подпись к карточке',
                likes: 25
            },
            112: {
                id: 112,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Подпись к карточке',
                likes: 25
            }
        }
    },
    'Название подкатегории': {
        timestamp: 1,
        parent: 'Самая большая категория',
        children: [],
        articles: {
            1: {
                id: 1,
                title: 'Заголовок',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 75
            },
            11: {
                id: 11,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Подпись к карточке',
                likes: 25
            }
        }
    },
    'Вторая категория': {
        timestamp: 2,
        parent: null,
        children: [],
        articles: {
            2: {
                id: 2,
                title: 'Нужно лишь только...',
                image: 'img/card-bg.jpg',
                texts: 'Краткое описание',
                likes: 54
            },
            6: {
                id: 6,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 76
            }
        }
    },
    'Подкатегория 2': {
        timestamp: 3,
        parent: 'Самая большая категория',
        children: [],
        articles: {
            2: {
                id: 2,
                title: 'Нужно лишь только...',
                image: 'img/card-bg.jpg',
                texts: 'Краткое описание',
                likes: 54
            },
            6: {
                id: 6,
                title: 'Новая статья!',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 76
            }
        }
    }
};

//

function rnd( max ) {
    return Math.floor( Math.random() * max );
}

function articlesGenerator( iters ) {

    const samples = [];
    for ( let i = 0; i < iters; i++ ) {

        const sample = {
            id: i,
            title: titles[ rnd( titles.length ) ],
            image: 'img/card-bg.jpg',
            texts: script[ rnd( titles.length ) ],
            likes: Math.floor( Math.random() * 100 ) || 0
        };

        samples.push( sample );
    }

    return samples;
}

function categoriesGenerator( articlesArr ) {

    const samples = {};
    for ( let i = 0; i < categories.length; i++ ) {

        const category = `${categories[ rnd( categories.length ) ]} категория`;

        const articles = {};
        for ( let i = 0; i < rnd( 10 ) % articlesArr.length; i++ ) {
            const article = articlesArr[ i ];
            articles[ article.id ] = article;
        }

        samples[ category ] = {
            timestamp: rnd( 100 ),
            parent: null,
            children: [],
            articles
        };
    }

    const parents = Object.keys( samples );
    const entries = Object.entries( samples );
    for ( const [ key, sample ] of entries.slice( 1, entries ) ) {

        if ( parents.length === 0 ) { break; }
        const parent = parents.splice( [ rnd( parents.length ) ], 1 )[ 0 ];

        sample.parent = parent;
        if ( !( key === parent ) && !samples[ parent ].children.includes( key ) ) {
            samples[ parent ].children.push( key );
        }

    }

    return samples;
}

//

export const fetchedArticles = articlesGenerator( 20 );

export const samplesCategories = { ...sample, ...categoriesGenerator( fetchedArticles ) };
