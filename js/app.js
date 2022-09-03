const loadContainer = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => disPlayContainer(data))
}

const disPlayContainer = data => {
    const navContainer = document.getElementById('nav-container');
    for(const nav of data.data.news_category){
        const newDiv = document.createElement('div')
        newDiv.classList.add('nav-item')
        newDiv.innerHTML = `
        <button id ="${nav.category_id}" onclick="loadNews(this.id)" type="button" class="btn btn-outline-secondary">${nav.category_name}</button>
        `
       navContainer.appendChild(newDiv);
    }
    
}

const loadNews =id=>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(newsData => displayNews(newsData))
    
}
const displayNews =newsData =>{
    const showNews = document.getElementById('show-news')
    showNews.textContent = ''
   for(const allNews of newsData.data){
    const newsDiv = document.createElement('div')
      newsDiv.classList.add('news-item')
      newsDiv.innerHTML = `
      <div class="card mb-3" >
      <div class="row g-0">
        <div class="col-md-2">
          <img src="${allNews.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">${allNews.title}</h5>
            <p class="card-text">${allNews.details}</p>
            <p class="card-text"><small class="text-muted">${allNews.total_view}</small></p>
          </div>
        </div>
      </div>
    </div>
      `
    showNews.appendChild(newsDiv)
}
}


loadContainer()