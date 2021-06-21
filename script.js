function runningData() { 
    $('.list-film').html('');
    $('.labels').html('');

    const inputSearch = document.querySelector('#input-search');
    
    const labelResult=document.createElement('h2');
    labelResult.innerText = "Results for " + inputSearch.value+':';

    html = document.querySelector('.labels');
    html.append(labelResult);


    
    $.ajax({
        type: "GET",
        url:'http://www.omdbapi.com/?apikey=49e1cf87&s='+inputSearch.value,
        dataType: "json",
        success: function (data) {
            console.log('Data:',data)
           if(data.Response == 'True'){
            $.map(data,function(i){
                for(i=0; i <=10; i++){
                    const image = document.createElement('div');
                    image.innerHTML=`<img src="${data.Search[i].Poster}" alt="Poster image">`;

                    const titleMovie = document.createElement("h3");
                    titleMovie.innerText = data.Search[i].Title;
                    
                    const typeMovie= document.createElement('p')
                    typeMovie.innerText = 'Type: '+ data.Search[i].Type;
                   
                    const year = document.createElement('p')
                    year.innerText = 'Year: ' + data.Search[i].Year;
                    
                    const inner = document.createElement("div");
                    inner.classList.add("inner")
                    inner.append(image,titleMovie,typeMovie,year);
                    
                    const cards = document.createElement('div');
                    cards.classList.add('cards');
                    cards.append(inner);
                
                    
                    container = document.querySelector('.list-film');
                    container.append(cards);
                }
            })
           


           }else{
            const notFound = document.createElement('h1');
            notFound.classList.add('notFound')
            notFound.innerText = 'Oops... movie not found!'
            container = document.querySelector('.list-film');
            container.append(notFound);
           }
        }
    });
 }



const searchButton = document.querySelector('.input-button');
searchButton.addEventListener('click', function (){
   runningData();
})
    
window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        runningData();
    }
  });

