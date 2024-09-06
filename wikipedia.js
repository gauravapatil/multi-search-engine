let content=document.getElementById("content");
const loading= (isLoading)=>
    {
        
        const load= document.getElementById("loading");
        if(isLoading)
        {
            load.classList.remove('hidden');
            
        }
        else{
            load.classList.add('hidden');
        }
    
    }
async function searchOnWikipedia() {
    content.innerText="";
    loading(true);
    const searchInput = document.getElementById('search-box');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    try {
       
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`);
        
        if (!response.ok) {
            throw new Error('Page not found');
        }

        const data = await response.json();

       
        console.log(data);
        console.log(data.query.search.length);
        loading(false)
        for(let i=0;i<data.query.search.length;i++){
            const url = `https://en.wikipedia.org/?curid=${data.query.search[i].pageid}`;
            let div=document.createElement("div");
            div.classList.add("container")
             div.innerHTML=` <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${data.query.search[i].title}</a>
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        <span class="result-snippet">${data.query.search[i].snippet}.....<a href="${url}">Read More</a></span><br>`
        content.appendChild(div);
        }
        

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while searching for the page.');
    }
}

// Add event listener for the search button
document.getElementById('btn').addEventListener('click', searchOnWikipedia);

// Optional: Enable pressing Enter to trigger search
document.getElementById('search-box').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchOnWikipedia();
    }
});

// let div = document.getElementById("info");
// const searchButton = document.getElementById('btn');
// const searchInput = document.getElementById('search-box');
// let loader=document.getElementById("loader");

// searchButton.addEventListener('click',searchOnWikipedia)

    
//     searchInput.addEventListener('keyup', (event) => {
//         console.log(event)
//         if (event.key === 'Enter') {
//             searchButton.click();
//         }
//     });

// async function searchOnWikipedia(){
//     const response=await fetch(`https://en.wikipedia.org/api/rest_v1/page/title/${searchInput.value}`);
//     const data=await response.json();
//     console.log(data);
    


// async function searchOnWikipedia(){
//     const url = `https://wikipedia-api1.p.rapidapi.com/get_summary?q=${searchInput.value}&lang=en&sentences=3`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '03cb0df4e2msh0c9286e19bd7d3cp1e1a87jsnabf2de98e032',
// 		'x-rapidapi-host': 'wikipedia-api1.p.rapidapi.com'
// 	}
// };

// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
//     let div=document.getElementById("content");
//     div.innerText=result.data;
// }