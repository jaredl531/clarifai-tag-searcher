# Clarifai Public Tag Searcher

A simple search engine that lets users know if a tag or phrase is contained within one or more of Clarifai's [public recognition models](https://www.clarifai.com/models). 

A live demo can be found [here](https://jared-hack-projects.s3.us-east-2.amazonaws.com/clarifai-tag-searcher/index.html)

<img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/clarifai-tag-searcher/screenshots/search-screen-cropped.png"/>

## Usage

To retrieve and store all of the pre-defined tags at runtime you will need a Clarifai API Key, which you can obtain by [signing up](https://portal.clarifai.com/signup) and then clicking on your default application. You'll then want to add it to the keys.js file:

```
var myApiKey = 'YOUR API KEY HERE';
```

Once this is done you can search for singular words (e.g. "crayon") or phrases (e.g. "Justin Bieber") via the "Show me the Models!" button. The accompanying models will then dynamically display in a table below the search bar, and if you click on any of the pictures in the results you will be taken to that model's page on Clarifai's website.

If you're feeling adventurous, you can hit the "I'm Feeling Taggy" button at any time and a random term from one or more of Clarifai's public models will be shown to you.
