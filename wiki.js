(function() {

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

var Wiki = {}, WikipediaEn = {};
window.Wiki = Wiki;
window.WikipediaEn = WikipediaEn;

Wiki.displayInfoBox = function (domain, templateName, pageName) {
  Wiki.getTemplate(domain, templateName, pageName, function (infobox) {
    var scriptDiv = document.getElementById('wikicontent');
    scriptDiv.innerHTML = JSON.stringify(infobox);
  });
}

WikipediaEn.getInfobox = function (pageTitle, cb) {
  Wiki.getTemplate('en.wikipedia.org/w', 'infobox', pageTitle, cb);
}

Wiki.getTemplate = function (domain, templateName, pageName, cb) {
  getWikiPage(domain, pageName, function(result) {
    var key = 0;
    for(var i in result.query.pages) {
      key = i;
    }
    var content = result.query.pages[key].revisions[0]['*'];
    var infoboxContent = parseWiki(content, templateName);
    if (infoboxContent) {
      var infobox = parseInfoBox(infoboxContent);
      cb(infobox);
    } else {
      cb({error:"template not found"});
    }
  });
}

function parseInfoBox(infoboxContent) {
  var infobox = {}, params, i, pair;
  infoboxContent = removeInternalTemplates(infoboxContent);
  infoboxContent = removeInternalLinks(infoboxContent);
  params = infoboxContent.split('|').slice(1);
  for (i = 0; i < params.length; ++i) {
    pair = params[i].split('=');
    infobox[pair[0].trim()] = pair[1].trim();
  }
  return infobox;
}

function removeInternalTemplates(template) {
  template = template.replace(/^{{|}}$/g, '');
  internalTemplates = matchTemplates(template);
  for (var i = 0; i < internalTemplates.length; ++i) {
    internalTemplate = internalTemplates[i];
    template = template.replace(internalTemplate, '');
  }
  return template;
}

function removeInternalLinks(template) {
  var links = template.match(/\[\[([^\]]*)\]\]/g) || [];
  for (var i = 0; i < links.length; ++i) {
    template = template.replace(links[i], '');
  }
  return template;
}

function matchTemplates (wikiContent) {
  return wikiContent.match(/{{[^]*?({{[^{}]*?}}[^]*?)*}}/g) || [];
}

function parseWiki(content, templateName) {
  var v = matchTemplates(content), infoboxContent, re;
  for(i=0; i< v.length; i++) {
    re = new RegExp(templateName, 'i');
    if(v[i].match(re)) {
      infoboxContent = v[i];
      break;
    }
  }
  return infoboxContent;
}

function getWikiPage(domain, pageName, cb) {
  var url = 'http://' + domain + '/api.php'
  JSONP.get(url, {'format': 'json', 'action': 'query',
                  'prop': 'revisions', 'titles':  pageName,
                  'rvprop': 'content', 'rvsection': '0'},
  function (data) {
    cb(data);
  });
}

})();

