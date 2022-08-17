


let news =[]
let category = "sport"

let menuList = document.querySelectorAll(".menus button")


menuList.forEach(button => button.addEventListener('click', function(event){menuButtonClickEvent(event)} ))

const render = () => {
  
      let newsHtml= ``
      
      newsHtml =news.map((news) =>  {return `<div class="row news">
        <div class="col-lg-4">
          <img class = "img" src="${news.media}">
        </div>
        <div class = "col-lg-8">
          <h2>'${news.title}'</h2>
          <p class="summary">
            ${news.summary}
          </p>
          <div>
            출처 : <a  href='${news.link}' target='_blank'>'${news.link}'</a>
          </div>
        </div>
      </div>`})

      document.getElementById("news-content").innerHTML = newsHtml.join('');
  

}

const callApi= async(url) => {
   try{ 
    let header = new Headers({'x-api-key': 'diJ2yPJjzcGaAzYHxO6d5SkM7hkOfwJtXchMzI52O4U'})
    let response = await fetch(url, {headers: header})
    console.log(response)
    if(response.status ==200){
      let data = await response.json();
      news=await data.articles
      if(data.total_hits==0){
        throw new Error("검색된 뉴스가 없습니다.")
      }
      render()
    }
    else{
    throw new Error(data.message) 
    }
      
  }catch(error){
        alert("에러메세지: "+error.message)
        }
  
}


const getLatestNews = async() =>{
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?topic=${category}&countries=KR&page_size=10`);
  callApi(url)

}



let menuButtonClickEvent=(event) =>{
  category= event.srcElement.innerHTML.toLowerCase()
  getLatestNews();  
}

let getNewsByKeyword = async() =>{

    let keyword = document.getElementById("finder-input").value
    let url =new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    callApi(url)
  
}




getLatestNews();