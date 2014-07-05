##  Wiki Infobox Fetcher

This is a library that helps to parse MediaWiki template parameters,
such as Wikipedia's infoboxes or SNPedia's genotypes or any other MediaWiki template.

## Examples of usage

SNPedia:

    var domain = 'bots.SNPedia.com',
        templateName = 'genotype',
        pageTitle = 'Rs1234(A;A)';
    Wiki.getTemplate(domain, templateName, pageTitle, function (templateData) {
      console.log(JSON.stringify(templateData));
    });

English Wikipedia:

    WikipediaEn.getInfobox('The Social Network', function (movie) {
      console.log(JSON.stringify(movie));
    })

