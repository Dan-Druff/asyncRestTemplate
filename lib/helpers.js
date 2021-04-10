var crypto = require('crypto');
var config = require('./config');
// var querystring = require('querystring');
var path = require('path');
// var fs = require('fs');
var fs = require('fs').promises;
var helpers = {};


helpers.parseJsonToObject = function(str){
 
try{
var obj = JSON.parse(str);
return obj;
}catch(e){
return {};
}
};
helpers.hash = function(str){
    if(typeof(str) == 'string' && str.length > 0){
var hash = crypto.createHmac('sha256', 'whatIsAHashingSecret').update(str).digest('hex');
return hash;
    }else{
        return false;
    }
};
helpers.createRandomString = function(strLength){
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
    // define all posssible characters
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var str = '';
    for(i=1; i<= strLength; i++){
        //get random character
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        //append character
        str += randomCharacter;
    }
    return str;
    
    }else{
        return false;
    }
};
helpers.getTemplate = async (templateName,data) => {
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof(data) == 'object' && data !== null ? data : {};

    if(templateName){
        var templatesDir = path.join(__dirname,'/../templates/');
        try {
            const templateResult = await fs.readFile(templatesDir+templateName+'.html','utf8');
            var finalString = helpers.interpolate(templateResult,data);
            return finalString;


        } catch (err) {
            throw err;
        }

       

    }else{
        return new Error("🚦 A valid template name was not specified 🚦");
    }
}

helpers.addUniversalTemplates = async (str,data) => {
    data = typeof(data) == 'object' && data !== null ? data : {};
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    try {
        const headerResult = helpers.getTemplate('_header',data);
        const footerResult = helpers.getTemplate('_footer',data);
        
        var uniArray = await Promise.all([headerResult,footerResult]);

        if(uniArray[0] instanceof Error || uniArray[1] instanceof Error){
            return new Error("🚦 error getting header or footer 🚦");

        }else{
            var fullString = uniArray[0]+str+uniArray[1];

            return fullString;
        }

     
       
    } catch (err) {
        throw err;
    }
}
//add universal header and footer to a string and pass data obj to header and footer for interpolation

//take string and data object and find and replace keys
helpers.interpolate = function(str,data){
str = typeof(str) == 'string' && str.length > 0 ? str : '';
data = typeof(data) == 'object' && data !== null ? data : {};
//add template globals
    for(var keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data['global.'+keyName] = config.templateGlobals[keyName];
    }
}
//for each key in data obj, insert its value into string at corrosponding placeholeder
for(var key in data){
  if(data.hasOwnProperty(key) && typeof(data[key]) == 'object' && data[key] instanceof Array){

    var replace = data[key];
    var find = '{'+key+'}';
    str = str.replace(find,replace);
  }
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
        var replace = data[key];
        var find = '{'+key+'}';
        str = str.replace(find,replace);
    }
}
return str;

};
helpers.getStaticAsset = async (fileName) => {
    fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if(fileName){
        try {
            var publicDir = path.join(__dirname,'/../public/');
          
            const pubData = await fs.readFile(publicDir+fileName);
            return pubData;
        } catch (err) {
            throw err;
        }
    }else{
        return new Error("🚦 A valid file name was not speecifeid. 🚦");

    }
}

module.exports = helpers;