function samplesGenerator( iters ) {

    const titles = [
        'Заголовок',
        'Кричащий заголовок',
        'Новая статья',
        'Успешный успех',
        'Продающая статья',
        'Нужно лишь только...',
        'Смотреть в будущее',
        'Однажды в..'
    ];

    const script = [
        'Краткое описание',
        'Описание статьи',
        'Подпись к карточке',
        'Очень длинное описание к карточке',
        'Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.'
    ];

    const samples = [];
    for ( let i = 0; i < iters; i++ ) {

        const sample = {
            id: i,
            title: titles[ Math.floor( Math.random() * titles.length ) ],
            image: 'img/card-bg.jpg',
            texts: script[ Math.floor( Math.random() * titles.length ) ],
            likes: Math.floor( Math.random() * 100 )
        };

        samples.push( sample );
    }

    return samples;
}

//

export const fetchedData = samplesGenerator( 20 );

export const sample = {
    'Начальный заголовок': {
        timestamp: 0,
        parent: null,
        children: [ 'Название подкатегории', 'Подкатегория 2' ],
        articles: {
            0: {
                id: 0,
                title: 'Новая статья',
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
        parent: 'Начальный заголовок',
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
                title: 'Новая статья',
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
                title: 'Новая статья',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 76
            }
        }
    },
    'Подкатегория 2': {
        timestamp: 3,
        parent: 'Начальный заголовок',
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
                title: 'Новая статья',
                image: 'img/card-bg.jpg',
                texts: 'Описание статьи',
                likes: 76
            }
        }
    }
};
