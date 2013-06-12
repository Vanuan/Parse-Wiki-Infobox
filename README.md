## Parse Wiki Infobox

This is a library that helps to parse MediaWiki template parameters.

Such as Wikipedia's infoboxes or SNPedia's genotypes

## Examples of usage

    var domain = 'bots.SNPedia.com',
        templateName = 'genotype',
        pageTitle = 'Rs1234(A;A)';
    Wiki.getTemplate(domain, templateName, pageTitle, function (template) {
      console.log(JSON.stringify(template));
    });

    WikipediaEn.getInfobox('The Social Network', function (movie) {
      console.log(JSON.stringify(movie));
    })

