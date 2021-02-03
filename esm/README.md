# Node
The NodeJS ESM Version is inside src/*

# Browser 
This can be used in the browser simply integrate it in your build chain
and use the exports.browser propertys as import maps

# TODO need to finish



## generate-named-entity-data json version for node and 

scripts/generate-named-entity-data/index.js
```js
//TODO: feature implement a json based node version and a js based browser version
    await writeFile('esm/src/tokenizer-named-entity-data.json', JSON.stringify(arr));
``` 

## remove mixin logic and bloat
The Code is using a lot of Mixins which overwrite existing functions 
and they are hard to read.


extension/ === mixins !

the parse5/lib/parser/index.js uses the parser mixins if 

## create import map 

./features/*

## CleanUp 

- serializer has only one option the tree adapter

## Contributors 
Needs fixing should be array of people
``` 
"Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
{ "name" : "Barney Rubble"
, "email" : "b@rubble.com"
, "url" : "http://barnyrubble.tumblr.com/"
}
```