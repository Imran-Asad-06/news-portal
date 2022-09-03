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
        <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand fw-bold">${nav.category_name}</a>
       </nav>
        `
       navContainer.appendChild(newDiv);
    }
}

loadContainer()