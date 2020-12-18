{
    'use strict';
    /* document.getElementById('test-button').addEventListener('click', function () {
                    const links = document.querySelectorAll('.titles a');
                    console.log('links:', links);
                }); */
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');

        /*[DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /*[DONE] add class 'active' to the clicked link */
        console.log('clickedElement: ', clickedElement);
        clickedElement.classList.add('active');
        /*[DONE] remove class 'active' from all articles */
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
        optTitleListSelector = '.titles';

    const generateTitleLinks = function () {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(`articles =  ${articles}`);

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
            console.log(html);

        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);

        }
    };

    generateTitleLinks();


}