var lexicon;
var item;
var listPar;
var output;
var rhymes;
var newP;

function setup() {
	noCanvas();

	var url = "https://docs.google.com/spreadsheets/d/1ZKJfW6pqK4p_ZSNOUyzVYdXmjvrOCSlIWXDzOi8eWgs/pubhtml";

	lexicon = new RiLexicon();

  	//buttons
  	var button1 = select('#generate');
  	button1.mousePressed(generateList);

  	function generateList() {
  		// Tabletop expects some settings
  		var settings = {
	    	key: url, // The url of the published google sheet
	    	callback: gotData, // A callback for when the data comes in
	    	simpleSheet: true // This makes things simpler for just a single worksheet of rows
  		};

	  	// Make the request
	  	Tabletop.init(settings);

	  	listPar = select('#list');
  		listPar.class('text');

	  	function gotData(data) {
	  		for (var i = 0; i < data.length; i++) {
      			item = createSpan(data[i].Word + ' ');
      			item.parent(listPar);
      			item.mouseClicked(rhyme);
            item.mousePressed(wikipedia);
    		}
  		}
  	}

  	function rhyme(data) {
		 console.log(this.html());
     var word = this.html();
     this.style('background-color', '#20B2AA');
     rhymes = lexicon.rhymes(word);
     console.log(rhymes); // display all the rhyming words

     for (var i=0; i<rhymes.length; i++) {
      newP = createSpan(rhymes[i] + ', ');
      newP.style('text-decoration', 'underline');
     }
		}

    function wikipedia(data) {
      console.log(this.html());

      var term = this.html();
      // URL for querying wikipedia
      var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
          + '&search=' + term;
      // Query the URL, set a callback
      // 'jsonp' is needed for security
      loadJSON(url, getDescription, 'jsonp');

      // We got the list of articles
      function getDescription(data) {
        // Look at article list
        var articles = data[2];

        var div = createElement('div', '');
          var p = createP(articles);
          p.parent(div);
          p.style('border', 'solid black 2px');
      }
    }

}