
let div = document.getElementById("info");
const searchButton = document.getElementById('btn');
const searchInput = document.getElementById('search-box');
let loader = document.getElementById("loader");

searchButton.addEventListener('click',searchOnGoogle)

    
    searchInput.addEventListener('keyup', (event) => {
        console.log(event)
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

let img=document.getElementById("load");
async function searchOnGoogle(){
    div.innerText="";
    loader.classList.add("loading");
    img.style.display="block";
    const url = `https://real-time-web-search.p.rapidapi.com/search?q=${searchInput.value}&limit=10`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '03cb0df4e2msh0c9286e19bd7d3cp1e1a87jsnabf2de98e032',
                    'x-rapidapi-host': 'real-time-web-search.p.rapidapi.com'
                }
        };
    
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
      loader.classList.remove("loading");
      img.style.display="none";
     for(let i = 0; i < result.data.length; i++){
         
         let container = document.createElement("div");
         console.log(container);
        container.classList.add("info-container");

        const webUrl = result.data[i].url;

        const webSnippet = result.data[i].snippet;

        const webTitle=result.data[i].title;

     container.innerHTML=`<p><a href="${webUrl}" style="color:black">${webUrl}</a></p>
                           <h2><a href="${webUrl}">${webTitle}</a></h2>
                           <h3>${webSnippet}</h3>`;

       div.appendChild(container);
    }
    
}