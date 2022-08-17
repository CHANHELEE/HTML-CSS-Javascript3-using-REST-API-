


let news =[]
let category = "sport"
let page=1;
let total_pages=0;

let menuList = document.querySelectorAll(".menus button")
let horizontalUnderline = document.querySelector(".menus div")


menuList.forEach(button => button.addEventListener('click', function(event){menuButtonClickEvent(event)} ))
menuList.forEach(button => button.addEventListener('click', function(event){horizontalIndicator(event)}))


const render = () => {  //callApi 에서 호출된다.
  
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

const pageNation = () =>{  //callApi 에서 호출된다.
  /**
   * total_page
   * page -> 어떤 페이지를 보고있는지?
   * page group -> 보고 있는 페이지의 그룹이 몇번째 인지? (ex) 한번에 5페이지씩 보여준다 -> 현재페이지 = 3 -> page group =1)
   * first G page-> 현재 속한 페이지 그룹의 첫번째 페이지는 무엇인가?
   * last G page -> 현재 속한 페이지 그룹의 마지막 페이지는 무엇인지?
   * (5 = 한번에 보여줄 페이지의 갯수)
   * pageCountInDisplay=한번에 보여줄 페이지의 갯수
   */

    let pageCountInDisplay =(total_pages < 5 ? total_pages : 5);

    let pageGroup = Math.ceil(page/pageCountInDisplay)
    
    let lastGPage = pageGroup * pageCountInDisplay
    
    let firstGPage = lastGPage-(pageCountInDisplay-1)

    let paginationHTML=``

    if(page!=1){
    paginationHTML =`
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${1})" >
          <span aria-hidden="true">&laquo;&laquo;&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page})" >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`
    }
    if(page == total_pages){
      lastGPage = total_pages
    }
    for (let i = firstGPage ; i <= lastGPage; i++){
      paginationHTML+=`<li class="page-item ${page == i ? "active" : ""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
      
    }

    if(page != total_pages){
      paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${total_pages})">
          <span aria-hidden="true">&raquo;&raquo;&raquo;</span>
        </a>
      </li>`
    }
    document.querySelector(".pagination").innerHTML = paginationHTML;

}

const callApi= async(url) => {
   try{ 
    let header = new Headers({'x-api-key': 's20x_U0rqd0c6qVBJdusMLEJpG6LLxuM1Esh5qPphsg'})
    let response = await fetch(url, {headers: header})
    console.log(response)
    if(response.status ==200){
      let data = await response.json();
      news=await data.articles
      // console.log(data)
      page = data.page
      total_pages = data.total_pages
      if(data.total_hits==0){
        throw new Error("검색된 뉴스가 없습니다.")
      }
      render();
      pageNation();

    }
    else{
    throw new Error(data.message) 
    }
      
  }catch(error){
        alert("에러메세지: "+error.message)
        }
  
}


const getLatestNews = async() =>{
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?topic=${category}&countries=KR&page_size=10&page=${page}`);
  callApi(url)

}



let menuButtonClickEvent=(event) =>{
  horizontalUnderline.style.display='block'; // 버튼 클릭시 언더바 생성
  category= event.srcElement.innerHTML.toLowerCase()
  getLatestNews();  
}

let getNewsByKeyword = async() =>{
    horizontalUnderline.style.display='none'; // 검색시 메뉴 언더바 제거
    let keyword = document.getElementById("finder-input").value
    let url =new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    callApi(url)
  
}

function horizontalIndicator(event){
  horizontalUnderline.style.left= event.currentTarget.offsetLeft+"px"; 
  horizontalUnderline.style.width= event.currentTarget.offsetWidth+"px";
  horizontalUnderline.style.top= event.currentTarget.offsetTop + event.currentTarget.offsetHeight+"px";

}



const moveToPage = (pageNum) =>{
  page = pageNum
  getLatestNews();  
}
getLatestNews();
