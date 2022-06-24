window.onload = () => {
    let q, range, stars
    const input_rating = $('#rating')
    const low_price = $('#low_price')
    const high_price = $('#high_price')
    const q_search = $('#q-search')
    const search_btn = $('#search-btn')

    //amm session
    const ammStars = sessionStorage.getItem('amm-stars')
    const ammRange = sessionStorage.getItem('amm-range')
    const ammQ = sessionStorage.getItem('amm-q')
    if (ammStars) {
        stars = Number(stars)
        input_rating.val(stars);
    }

    search_btn.on('click', () => {
        // stars
        input_rating.val(stars);
        sessionStorage.setItem('amm-stars', stars)
        // stars end
        //range
        if (range) {
            const array = range.split(',')
            if (array && array.length) {
                const l = array[0]
                const h = array[1]
                low_price.val(l || 0)
                high_price.val(h)
                sessionStorage.setItem('amm-range', range)
            }
        }
        //range end
        //qsearch
        sessionStorage.setItem('amm-q', q)
        //qsearch end
    })

    q_search.on('input', (e) => {
        q = e.target.value
    })

    $('.range-slider').jRange({
        from: 0,
        to: 100,
        step: 1,
        format: '%s',
        width: 300,
        showLabels: true,
        isRange: true,
        onstatechange: (e) => {
            range = e
            console.log(range, 'range')
        }
    });
    setTimeout(() => {
        if (ammRange) {
            range = ammRange
            $('.range-slider').jRange('setValue', '10,20');
        }
    }, 100)

    if(ammQ) {
        q = ammQ
        q_search.val(ammQ)
    }

    $("#my-rating").starRating({
        initialRating: ammStars || 4,
        strokeColor: '#de003f',
        strokeWidth: 10,
        starSize: 15,
        disableAfterRate: false,
        useFullStars: true,
        callback: (currentRating) => {
            stars = currentRating
            console.log(stars, 'current rating')
            // make a server call here
        }
    });
}
