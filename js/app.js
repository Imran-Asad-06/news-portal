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
  toggleSpinner(true);
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
            <p class="card-text">${allNews.details.slice(0, 600)+ "......."}</p>
            <div class ="d-flex justify-content-around">
            <div>   <img id ="authorImg" class="rounded" src ="${allNews.author.img}"> <small class="text-muted">
            <p class="card-text"> ${allNews.author.name}</small></p>  </div>
           <p class="card-text> <small class="text-muted"> Views : ${allNews.total_view }</small></p>
            <small><button id ="${allNews._id}" onclick="showDetails('${allNews._id}')"  type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button></small>
           
               <div>
            </div>
        </div>
      </div>
    </div>
      `
    showNews.appendChild(newsDiv)
}
 toggleSpinner(false);
}
// Spinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

const showDetails = newsId => {
  fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
  .then(res => res.json())
  .then(detailsdata => modalDetails(detailsdata)  )
}
const modalDetails = detailsdata =>{
  //console.log(detailsdata.data[0].author.name)
  const modalTitle = document.getElementById('exampleModalLabel')
  modalTitle.innerText = detailsdata.data[0].author.name? detailsdata.data[0].author.name:'No Name Found'
  const modalBody = document.getElementById('modalbody')
  modalBody.innerHTML =`
    <p> Total Views : ${detailsdata.data[0].total_view? detailsdata.data[0].total_view:'No Data Found'} </P>
    <p> Rating : ${detailsdata.data[0].rating.number? detailsdata.data[0].rating.number:'No Data Found'} </P>
  `
}

loadContainer()