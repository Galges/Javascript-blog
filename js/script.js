'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  let articleSelection=clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(articleSelection);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
let html='';
  /* remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);

function clearMessages() {
    titleList.innerHTML = '';
  }

  clearMessages();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){

  const articleId = article.getAttribute('id');
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  html = html + linkHTML;
}

titleList.innerHTML = html;
const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
  
  
}
    /* get the article id */
  

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */
  
}

generateTitleLinks();