/*
  Purpose: Fill in results table with appropriate models
  Args:
    tag - A search tag entered by the user (String)
*/
function doAnalysis(tag) {
	// first clear old table
	document.getElementById("ResultsTable").innerHTML = "";
	
	// Then trim the tag
	var trimmedTag = tag.trim(); 
	
	var modelResults = getModels(trimmedTag);
	var textDiv = document.getElementById("resultText");
	var resultsTable = document.getElementById("ResultsTable");
	
	// No Results
	if(modelResults.length == 0) {
		textDiv.innerHTML = "Bummer! \"" + capitalize(trimmedTag) + "\" does not appear in any of our models :-(";
	}
	
	else {
		textDiv.innerHTML = "\"" + capitalize(trimmedTag) + "\" appears in the following:<br/><br/>";
		var mainRow = resultsTable.insertRow(-1);
		
		// Loop through models
		for(var i=0; i < modelResults.length; i++) {
			var newCell = mainRow.insertCell(i);
			newCell.innerHTML = "<a href='https://clarifai.com/models/" + modelResults[i] + "-image-recognition-model/" + modelIDs[modelResults[i]] + "' target='_blank'><img src='Model%20Images/" + modelResults[i] + ".jpg'\></a>";
		}
	}
}


/*
  Purpose: Return all models that contain a certain tag
  Args:
    tag - A search tag entered by the user (String)
  Returns:
  	modelResults - an array of all models that contain the tag
*/
function getModels(tag) {
	var modelTag = tag.toLowerCase();
	var modelResults = [];
	
	// APPAREL
	if(apparelTags.includes(modelTag)) {
		modelResults.push("apparel");
	}
	
	// CELEBRITY
	if(celebrityTags.includes(modelTag)) {
		modelResults.push("celebrity");
	}
	
	// COLOR
	if(colorTags.includes(modelTag)) {
		modelResults.push("color");
	}
	
	// DEMOGRAPHICS
	if(demographicsTags.includes(modelTag)) {
		modelResults.push("demographics");
	}
	
	// FOOD
	if(foodTags.includes(modelTag)) {
		modelResults.push("food");
	}
	
	// GENERAL
	if(generalTags.includes(modelTag)) {
		modelResults.push("general");
	}
	
	// LOGO
	if(logoTags.includes(modelTag)) {
		modelResults.push("logo");
	}
	
	// MODERATION
	if(moderationTags.includes(modelTag)) {
		modelResults.push("moderation");
	}
		
	// NSFW
	if(nsfwTags.includes(modelTag)) {
		modelResults.push("nsfw");
	}
		
	// TRAVEL
	if(travelTags.includes(modelTag)) {
		modelResults.push("travel");
	}
		
	// WEDDING
	if(weddingTags.includes(modelTag)) {
		modelResults.push("wedding");
	}
	
	return modelResults;
}

/*
  Purpose: Retrieves a random tag across all of our models
  Returns:
  	A string of a random tag
*/ 
function getRandomTag() {
	var tagLists = [
		apparelTags, 
		celebrityTags, 
		colorTags, 
		demographicsTags, 
		foodTags, 
		generalTags, 
		logoTags, 
		moderationTags,
		nsfwTags,
		travelTags,
		weddingTags
	];
	
	var randomIndex = Math.floor((Math.random() * 11));
	
	var randomTagList = tagLists[randomIndex];
	
	return randomTagList[Math.floor(Math.random()*randomTagList.length)];
}

/*
  Purpose: Capitalizes words in a String
  Args:
  	s - A String
*/ 
function capitalize(s){
    return s.toLowerCase().replace( /(^|\s)([a-z])/g, function(match, group_1, group_2){return group_1 + group_2.toUpperCase()});
};

/*
  Purpose: Initialize arrays with model tags via calls to the API
*/ 
function loadTagLists() {
	apparelTags = getInitialTags("apparel");
	celebrityTags = getInitialTags("celebrity");
	colorTags = getInitialTags("color");
	demographicsTags = 	["masculine","feminine","asian","black","african american","hispanic","latino","spanish","white","american indian","alaska native","native hawaiian","pacific islander","middle eastern","north african"];
	foodTags = getInitialTags("food");
	generalTags = getInitialTags("general");
	logoTags = getInitialTags("logo");
	moderationTags = getInitialTags("moderation");
	nsfwTags = getInitialTags("nsfw");
	travelTags = getInitialTags("travel");
	weddingTags = getInitialTags("wedding");
}

/*
  Purpose: Initialize arrays with model tags via calls to the API
  Args:
  	modelID - A public model ID
  Returns:
  	arrayItems - an array of tag lists for the individual modelID
*/ 
function getInitialTags(model) {
	var arrayItems = [];
	
	app.models.initModel(modelIDs[model]).then(
  	getModelOutputInfo
	);

	function getModelOutputInfo(model) {
	  model.getOutputInfo().then(
	    function(response) {
    		var items = response.rawData.output_info.data.concepts;
      	
    		for(var i=0; i < items.length; i++) {
      		arrayItems.push(items[i].name.toLowerCase());
    		}		
	    },
	    function(err) {
	      console.log(err);
	    }
	  );
	}
	
	return arrayItems;
}

// Model ID Dictionary

var modelIDs = {
	"apparel": "e0be3b9d6a454f0493ac3a30784001ff",
	"celebrity": "e466caa0619f444ab97497640cefc4dc",
	"color": "eeed0b6733a644cea07cf4c60f87ebb7",
	"demographics": "c0c0ac362b03416da06ab3fa36fb58e3",
	"food": "bd367be194cf45149e75f01d59f77ba7",
	"general": "aaa03c23b3724a16a56b629203edc62c",
	"logo": "c443119bf2ed4da98487520d01a0b1e3",
	"moderation": "d16f390eb32cad478c7ae150069bd2c6",
	"nsfw": "e9576d86d2004ed1a38ba0cf39ecb4b1",
	"travel": "eee28c313d69466f836ab83287a54ed9",
	"wedding": "c386b7a870114f4a87477c0824499348"
}
