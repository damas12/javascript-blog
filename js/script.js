{
    'use strict';
    /* document.getElementById('test-button').addEventListener('click', function () {
                    const links = document.querySelectorAll('.titles a');
                    console.log('links:', links);
                }); */
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* get 'href' attribute from the clicked link */
        const href = clickedElement.getAttribute('href');
        /* find the correct article using the selector (value of 'href' attribute) */
        const currentArticle = document.querySelector(href);
        /* add class 'active' to the correct article */
        currentArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = '') {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        console.log(articles);
        let html = '';

        for (let article of articles) {
            article.querySelector(optArticleSelector);
            /* get the article id */
            const articleId = article.getAttribute('id');
            console.log(`articleId = ${articleId}`);
            /* find and get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* create HTML of the link */
            const linkHTML = `<li><a href="#` + articleId + `"><span>` + articleTitle + `</span></a></li>`;
            /* insert link into titleList */
            //titleList.insertAdjacentHTML('beforeend', linkHTML);
            //console.log(titleList)
            /* insert link into html variable */
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);

        }
    }

    generateTitleLinks();

    const generateTags = function () {

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const titleList = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ')
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate html of the link */
                const tagsHTML = ` <li><a href="#tag-` + tag + `"> ` + tag + ` </a></li>`
                /* add generated code to html variable */
                html = html + tagsHTML;
                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            titleList.innerHTML = html;
            /* END LOOP: for every article */
        }
    }
    generateTags();

    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeLinks = document.querySelectorAll('.post-tags .list a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for (let activeLink of activeLinks) {
            /* remove class active */
            activeLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]')
        /* START LOOP: for each found tag link */
        for (let allTagLink of allTagsLinks) {
            /* add class active */
            allTagLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    const addClickListenersToTags = function () {
        /* find all links to tags */
        const linkTags = document.querySelectorAll('.post-tags .list a[href^="#tag-"]');
        /* START LOOP: for each link */
        for (let linkTag of linkTags) {
            /* add tagClickHandler as event listener for that link */
            linkTag.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }
    addClickListenersToTags();

    const generateAuthors = function () {

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find article wrapper */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            /* make html variable with empty string */
            let html = '';
            /* get author from data-author attribute */
            const articleAuthor = article.getAttribute('data-author');
            /* generate html of the link */
            const authorHTML = ` <a href="#author-` + articleAuthor + `"> ` + articleAuthor + ` </a>`
            /* add generated code to html variable */
            html = html + authorHTML;
            /* insert HTML of all the links into the author wrapper */
            authorWrapper.innerHTML = html;
        }
    }
    generateAuthors();

    const authorClickHandler = function (event) {
        /* Add prevent default function to event */
        event.preventDefault();
        /* Make clicked element variable and asign 'this value to it' */
        const clickedElement = this;
        /* Read href atribute of clicked element */
        const authorhref = clickedElement.getAttribute('href');
        console.log(authorhref);
        /* Make author variable and extract author from href atribute */
        const author = authorhref.replace('#author-', '');
        console.log(author);
        /* Find all active author links */
        let authorLinks = document.querySelectorAll('a.active[data-author=""]');
        /* Start LOOP for every active author links */
        for (let authorLink of authorLinks) {
            /* Remove active class */
            authorLink.classList.remove('active');
            /* End LOOP */
        }
        /* Find all author articles */
        const articlesAuthorList = document.querySelectorAll('a[data-author="' + author + '"');
        /* Start LOOP for every author article */
        for (let articleAuthor of articlesAuthorList) {
            /* Add active class */
            articleAuthor.classList.add('active');
            /* End LOOP */
        }
        /* execute function "generatheTitleLinks" with author selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    };
    const addClickListenersToAuthors = function () {
        /* Find all links to authors */
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        /* Start LOOP for every author link */
        for (let authorLink of authorLinks) {

            /* Add authorClickHandler to link as event listener */
            authorLink.addEventListener('click', authorClickHandler);
        }

    };
    addClickListenersToAuthors();
}