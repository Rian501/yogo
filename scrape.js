// var request = require("request");
// var cheerio = require("cheerio");

// // request("https://news.ycombinator.com", function(error, response, html) {
// //   if (!error && response.statusCode == 200) {
// //     console.log(html);
// //   }
// // });

// function scrapeDescrip() {
    
//     request("https://www.wolframalpha.com/input/?i=downward+dog+pose", function(error, response, html) {
//         setTimeout(function() {
//         if (!error && response.statusCode == 200) {
//             var $ = cheerio.load(html);
//                 //   var descrip = $('b-typo-text-wr').children('p');
//                 //   console.log(descrip.text());
                
//             }
//             console.log('idk what dif is but', html);
//             }, 10000);
//         })
// }

// scrapeDescrip();

var casper = require("casper").create();

casper.start("http://casperjs.org/", function() {
  this.echo(this.getTitle());
});

casper.thenOpen("http://phantomjs.org", function() {
  this.echo(this.getTitle());
});

casper.run();