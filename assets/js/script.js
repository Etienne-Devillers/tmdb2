let dataObj;

containerLoader.classList.add('active');

// Fonction de calcul des étoiles pour le score 
let ranking = (a) => {

    let modulo = a % 2;
    let starsCount = a / 2;
    var rankingString;
    rankingString = ' ';
    for (var i = 1; i <= 5; i++) {
        if (starsCount >= i) {
            rankingString += '<img src="../assets/img/star-solid.svg">'
        } else if (modulo > 1.6) {
            rankingString += '<img src="../assets/img/star-solid.svg">'
            modulo = 0;
        } else if (modulo > 0.7) {
            rankingString += '<img src="../assets/img/star-half-alt-solid.svg">'
            modulo = 0;
        } else {
            rankingString += '<img src="../assets/img/star-regular.svg">'
        }
    }
    rankingString += a + '/10'
    return rankingString;
}

fetch("https://api.themoviedb.org/3/trending/all/day?api_key=17e449c9ac5f1ea954573c1685157a93")

    .then(function (resp) {
        return resp.json();
    })
    .then(function (datas) {

        for (let i = 0; i < ((datas.results.length) - 1); i++) {
            let cloneFix = document.querySelector('.clone').cloneNode(true)
            document.querySelector('.row').appendChild(cloneFix);

            let cards = document.querySelectorAll('.card');
            cards[i].addEventListener('click', () => {
                backgroundImg.src = 'https://image.tmdb.org/t/p/original/' + datas.results[i].backdrop_path;
                modalContainer.style.visibility = 'visible'
            })

            let cardPosters = document.querySelectorAll('.poster');
            let cardTitles = document.querySelectorAll('.filmTitle');
            let cardTexts = document.querySelectorAll('.filmText');
            let cardNotes = document.querySelectorAll('.filmNote');
            
            cardTitles[i].innerHTML = datas.results[i].original_title;
            cardTexts[i].innerHTML = datas.results[i].overview;
            cardNotes[i].innerHTML = ranking(datas.results[i].vote_average);
            cardPosters[i].src = 'https://image.tmdb.org/t/p/original/' + datas.results[i].poster_path;
        }
        console.log(datas)
        containerLoader.classList.remove('active');
    });

modalContainer.addEventListener('click', () => {
    modalContainer.style.visibility = 'hidden'
    backgroundImg.src = ''
})



// test.addEventListener('click', () => {
//     backgroundImg.src = 'https://image.tmdb.org/t/p/original/' + dataObj.results[0].backdrop_path;
// })


// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc
// https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&sort_by=vote_average.desc
// https://api.themoviedb.org/3/discover/tv?with_genres=18
// https://api.themoviedb.org/3/genre/movie/list
// https://api.themoviedb.org/3/trending/all/week
// https://api.themoviedb.org/3/search/keyword?query=parasite