function samplesGenerator( iters ) {

    const titles = [ 'Новая статья', 'Успешный успех', 'Продающая статья', 'Нужно лишь только...' ];
    const script = [ 'Краткое описание', 'Описание статьи', 'Подпись к карточке' ];
    const images = [ '800', '1000', '400' ];

    const samples = [];
    for ( let i = 0; i < iters; i++ ) {

        const sample = {
            id: i,
            title: titles[ Math.floor( Math.random() * titles.length ) ],
            image: `/static/${Math.floor( Math.random() * images.length )}`,
            texts: script[ Math.floor( Math.random() * titles.length ) ],
            likes: Math.floor( Math.random() * 100 )
        };

        samples.push( sample );
    }

    return samples;
}

export const fetchedData = samplesGenerator( 20 );
