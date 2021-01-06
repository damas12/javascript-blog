{
    'use strict';
    /* document.getElementById('test-button').addEventListener('click', function () {
                    const links = document.querySelectorAll('.titles a');
                    console.log('links:', links);
                }); */
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-links').innerHTML),
        authorlink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
    }
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
        /* get opts.atribute.href attribute from the clicked link */
        const href = clickedElement.getAttribute(opts.atribute.href);
        /* find the correct article using the selector (value of opts.atribute.href attribute) */
        const currentArticle = document.querySelector(href);
        /* add class 'active' to the correct article */
        currentArticle.classList.add('active');
    };
    const opts = {
        tagSizes: {
            count: 5,
            classPrefix: 'tag-size-',
        },
        atribute: {
            href: 'href'
        }
    };

    const select = {
        all: {
            articles: '.post',
            linksTo: {
                tags: 'a[href^="#tag-"]',
                authors: 'a[href^="#author-"]',
            },
        },
        article: {
            tags: '.post-tags .list',
            author: '.post-author',
            title: '.post-title',
        },
        listOf: {
            titles: '.titles',
            tags: '.tags.list',
            authors: '.authors.list',
        },
    };

    function generateTitleLinks(customSelector = '') {

        /* remove contents of titleList */
        const titleList = document.querySelector(select.listOf.titles);
        titleList.innerHTML = '';
        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(select.all.articles + customSelector);
        let html = '';

        for (let article of articles) {
            article.querySelector(select.all.articles);
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find and get the title from the title element */
            const articleTitle = article.querySelector(select.article.title).innerHTML;
            /* create HTML of the link */
            const linkHTMLData = {
                id: articleId,
                title: articleTitle
            };
            const linkHTML = templates.articleLink(linkHTMLData);
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
    const calculateTagsParams = function (tags) {
        const params = {
            max: '0',
            min: '999999'
        }
        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        return params;
    }
    const calculateTagClass = function (count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
        return opts.tagSizes.classPrefix + classNumber;
    }
    const generateTags = function () {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(select.all.articles);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const titleList = article.querySelector(select.article.tags);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ')
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate html of the link */

                const linkHTMLData = {
                    id: tag,
                };
                const linkHTML = templates.tagLink(linkHTMLData);
                /* add generated code to html variable */
                html = html + linkHTML;
                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }

                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            titleList.innerHTML = html;
            /* END LOOP: for every article */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');
        const tagsParams = calculateTagsParams(allTags);
        /* [NEW] create variable for all links HTML code */
        const allTagsData = {
            tags: []
        };

        /* [NEW] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {
            /* [NEW] generate code of a link and add it to allTagsHTML */
            /*const tagLinkHTML = '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + '</a></li>';*/
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        console.log(allTagsData);
    }
    generateTags();

    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute(opts.atribute.href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
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
        const linkTags = document.querySelectorAll(select.all.linksTo.tags);
        /* START LOOP: for each link */
        for (let linkTag of linkTags) {
            /* add tagClickHandler as event listener for that link */
            linkTag.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }
    addClickListenersToTags();

    function generateAuthors() {
        let allAuthors = {};
        /* find all articles */
        const articles = document.querySelectorAll(select.all.articles);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find author wrapper */
            const authorWrapper = article.querySelector(select.article.author);
            /* make html variable with empty string */
            let html = "";
            /* get author from data-author attribute */
            const author = article.getAttribute("data-author");
            /* generate HTML of the link */

            //const linkHTML = '<a href="#author-' + author + '"><span>' + author + "</span></a>";
            const linkHTMLData = {
                id: author,
            };
            const linkHTML = templates.authorlink(linkHTMLData);

            /* add generated code to html variable */
            html = html + linkHTML;
            /* [NEW] check if this link is NOT already in allAuthors */
            if (!allAuthors[author]) {
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            }
            /* insert HTML of all the links into the author wrapper */
            authorWrapper.innerHTML = html;
            /* END LOOP: for every article: */
            /* [NEW] find list of authors in right column */
            const authorList = document.querySelector(select.listOf.authors);
            /* [NEW] create variable for all links HTML code */
            //let allAuthorsHTML = "";
            const allAuthorsData = {
                authors: []
            };
            /* [NEW] START LOOP: for each author in allAuthors: */
            for (let author in allAuthors) {
                /* [NEW] generate code of a link and add it to allAuthorsHTML */
                //const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + " " + allAuthors[author] + "</a></li>";
                allAuthorsData.authors.push({
                    author: author,
                    count: allAuthors[author],
                });
                /* [NEW] add html from allAutors to tagList */
                //authorList.innerHTML = allAuthorsHTML;
                authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
            }
        }
    }
    generateAuthors();

    const authorClickHandler = function (event) {
        /* Add prevent default function to event */
        event.preventDefault();
        /* Make clicked element variable and asign 'this value to it' */
        const clickedElement = this;
        /* Read href atribute of clicked element */
        const authorhref = clickedElement.getAttribute(opts.atribute.href);
        /* Make author variable and extract author from href atribute */
        const author = authorhref.replace('#author-', '');
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
        const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
        /* Start LOOP for every author link */
        for (let authorLink of authorLinks) {

            /* Add authorClickHandler to link as event listener */
            authorLink.addEventListener('click', authorClickHandler);
        }

    };
    addClickListenersToAuthors();

}