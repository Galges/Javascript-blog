'use strict';
function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percentage = normalizedCount / normalizedMax,
    classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags-list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.post-author';

function generateTitleLinks(customSelector=''){
  let html='';
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = '';
  }

  clearMessages();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  /* insert link into titleList */
  titleList.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  
}
generateTitleLinks();

function generateTags(){
   /* [NEW] create a new variable allTags with an empty array */
   let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tags = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html ='';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(optArticleTagsSelector);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
  for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp</span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
       allTags[tag]++;
      } 
    /* END LOOP: for each tag */
  }
  /* insert HTML of all the links into the tags wrapper */
  tags.innerHTML = html;
  /* END LOOP: for every article: */
 }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:' , tagsParams)

  let allTagsHTML = '';

  for(let tag in allTags){
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) +'" > <span>' + tag +'   </span></a></li>';
    console.log('tagLinkHTML:', tagLinkHTML)
    allTagsHTML += tagLinkHTML
  }

  tagList.innerHTML = allTagsHTML;
}

generateTags();
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
 }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
 for(let hrefLink of hrefLinks){
    /* add class active */
    hrefLink.classList.add('active');
    /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
   generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
  
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  const authors = document.querySelector(optAuthorsListSelector);

  for(let article of articles){
    
    const authorList = article.querySelector(optArticleAuthorSelector);
    
    // let html ='';
    
    console.log(authorList);
    
    const articleAuthor = article.getAttribute('data-author');
    console.log(optArticleAuthorSelector);

    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor+ '</span></a>';

     // html = html + linkHTML;
     if (!allAuthors.hasOwnProperty(articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
      authorList.innerHTML = linkHTML;
      }

      const authorsList = document.querySelector('.authors');
      let allAuthorsHTML = '';
      const authorsParams = calculateTagsParams(allAuthors);
      console.log('authorsParams:' , authorsParams)
      
      
    
    for (let author in allAuthors) {
      
      allAuthorsHTML += '<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author],authorsParams) + '"><span>' +author +' </span></a></li>';
      
    }
      authorsList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-', ''),
    authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }

  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let hrefLink of hrefLinks) {
    hrefLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();


