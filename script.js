function runningData() {
    $('.list-film').html('');
    $('.labels').html('');

    const inputSearch = document.querySelector('#input-search');

    const labelResult = document.createElement('h2');
    labelResult.innerText = "Results for " + inputSearch.value + ':';

    html = document.querySelector('.labels');
    html.append(labelResult);



    $.ajax({
        type: "POST",
        url: 'https://www.omdbapi.com/?apikey=49e1cf87&s=' + inputSearch.value,
        dataType: "json",
        success: function (data) {
          
            if (data.Response == 'True') {

              $.each(data.Search, function (i, data) { 
                const image = document.createElement('div');
                image.innerHTML = `<img src="${data.Poster}" alt="Movie image">`;

                const titleMovie = document.createElement("h3");
                titleMovie.innerText = data.Title;

                const typeMovie = document.createElement('p')
                typeMovie.innerText = 'Type: ' + data.Type;

                const year = document.createElement('p')
                year.innerText = 'Year: ' + data.Year;

                const buttonDetail = document.createElement('div')
                buttonDetail.classList.add('btnDetail');
                buttonDetail.innerHTML =`<button data-id="${data.imdbID}" class="btnDetails"
                data-bs-toggle="modal" data-bs-target="#exampleModal">Detail <span><i class="fas fa-info-circle"></i></span></button>`

                const inner = document.createElement("div");
                inner.classList.add("inner")
                inner.append(image, titleMovie, typeMovie, year, buttonDetail);

                const cards = document.createElement('div');
                cards.classList.add('cards');
                cards.append(inner);
                
                container = document.querySelector('.list-film');
                container.append(cards);

              });




            } else {
               const imageNotFound = document.createElement('div')
               imageNotFound.innerHTML = `<img src="assets/undraw_page_not_found_su7k .svg" 
               alt="image 404" class="imgNotFound">`

               const textNotFound = document.createElement('div')
               textNotFound.innerHTML = `<h3 class="teksNotFound">Oops...movie not found!</h3>`
                
               const modalNotFound = document.createElement('div')
               modalNotFound.classList.add('modalNotFound')
               modalNotFound.append(imageNotFound,textNotFound)

               const container = document.querySelector('.list-film')
               container.append(modalNotFound)
            }
        }
    });
}

function deleteData() {
    const inputSearch = document.querySelector('#input-search');
    $.ajax({
        type: "GET",
        url: 'https://www.omdbapi.com/?apikey=49e1cf87&s=' + inputSearch.value,
        dataType: "json",
        success: function () {
            $('.list-film').html('');
            $('.labels').html('');
            $('#input-search').val('');

        }
    });
}

const searchButton = document.querySelector('.input-button');
searchButton.addEventListener('click', function () {
    runningData();
})

window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        runningData();
    }
});

const deleteButton = document.querySelector('.input-button-delete');
deleteButton.addEventListener('click', function () {
    deleteData();
})



$(".list-film").on('click', ".btnDetails", function () {
        console.log($(this).data('id'))
        $.ajax({
            type: "GET",
            url: 'https://www.omdbapi.com/?apikey=49e1cf87&i=' + $(this).data('id'),
            dataType: "json",
            success: function (film) {
                if (film.Response == 'True') {

                    $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                            <img src="${film.Poster}" alt="Movie image" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul>
                                    <li class="no-list-1"><h4>${film.Title}</h4></li>
                                    <li><b>Genre:</b> ${film.Genre}</li>
                                    <li><b>Rated:</b> ${film.Rated}</li>
                                    <li><b>Released: </b>${film.Released}</li>
                                    <li><b>Director:</b> ${film.Director}</li>
                                    <li><b>Writer:</b> ${film.Writer}</li>
                                    <li><b>Plot:</b></li>
                                    <li class="no-list-2">${film.Plot}</li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
                    $('.modal-footer').html(`
                        <div class="container-fluid">
                            <h5><span><i class="fas fa-star"></i> </span> IMDB Rating: ${film.imdbRating}</h5>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
            `)
                } else {

                }
            }
        });
    })

    