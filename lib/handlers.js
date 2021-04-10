
var _data = require('./data');
var helpers = require('./helpers');

var handlers = {};
handlers._users = {};
handlers._tokens = {};

//    html handlers
handlers.ping = async (data) => {
    try {
        console.log("🏗 AT PING FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'pingHeadTitle',
                'head.description':'pingHeadDesc',
                'body.class' : 'ping'
            };
            const pingTemplate = await helpers.getTemplate('ping',templateData);
            if(pingTemplate){
                const fullHtml = await helpers.addUniversalTemplates(pingTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get ping template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get ping template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("INDEX ERROR", err);
        return [405,undefined,'html'];
    }
}
handlers.index = async (data) => {

    try {
        console.log("🏗 AT INDEX FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'indexHeadTitle',
                'head.description':'indexHeadDesc',
                'body.class' : 'index'
            };
            const indexTemplate = await helpers.getTemplate('index',templateData);
            if(indexTemplate){
                const fullHtml = await helpers.addUniversalTemplates(indexTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get index template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get index template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("INDEX ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.notFound = async (data) => {
    try {
        console.log("🏗 AT NOT FOUND FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'notFoundHeadTitle',
                'head.description':'notfoundHeadDesc',
                'body.class' : 'notFound'
            };
            const notFoundTemplate = await helpers.getTemplate('notFound',templateData);
            if(notFoundTemplate){
                const fullHtml = await helpers.addUniversalTemplates(notFoundTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get notfound template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get notfound template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("notfound ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.accountCreate = async (data) => {
    try {
        console.log("🏗 AT accountCreate FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'Create an Account',
                'head.description':'SignUp is Easy.',
                'body.class' : 'accountCreate'
            };
            const accountCreateTemplate = await helpers.getTemplate('accountCreate',templateData);
            if(accountCreateTemplate){
                const fullHtml = await helpers.addUniversalTemplates(accountCreateTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get accountCreate template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get accountCreate template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("accountCreate ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.accountEdit = async (data) => {
    try {
        console.log("🏗 AT accountEdit FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'Edit Account',
                'head.description':'Account Info',
                'body.class' : 'accountEdit'
            };
            const accountEditTemplate = await helpers.getTemplate('accountEdit',templateData);
            if(accountEditTemplate){
                const fullHtml = await helpers.addUniversalTemplates(accountEditTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get notfound template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get notfound template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("account edit ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.accountDeleted = async (data) => {
    try {
        console.log("🏗 AT accountDeleted FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'Account Deleted',
                'head.description':'You Have Been Deleted',
                'body.class' : 'accountDeleted'
            };
            const accountDeleted = await helpers.getTemplate('accountDeleted',templateData);
            if(accountDeleted){
                const fullHtml = await helpers.addUniversalTemplates(accountDeleted,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get accountDeleted template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get naccountDeleted template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("accountDeleted ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.sessionCreate = async (data) => {
    try {
        console.log("🏗 AT sessionCreate FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'Login to Account',
                'head.description':'Login',
                'body.class' : 'sessionCreate'
            };
            const sessionCreateTemplate = await helpers.getTemplate('sessionCreate',templateData);
            if(sessionCreateTemplate){
                const fullHtml = await helpers.addUniversalTemplates(sessionCreateTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get sessionCreate template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get sessionCreate template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("sessionCreate ERROR", err);
        return [405,undefined,'html'];
    }

}
handlers.sessionDeleted = async (data) => {
    try {
        console.log("🏗 AT sessionDeleted FUNCTION");
        if(data.method == 'get'){
            var templateData = {
                'head.title':'Logged Out',
                'head.description':'LogOut',
                'body.class' : 'sessionDeleted'
            };
            const sessionDeletedTemplate = await helpers.getTemplate('sessionDeleted',templateData);
            if(sessionDeletedTemplate){
                const fullHtml = await helpers.addUniversalTemplates(sessionDeletedTemplate,templateData);
                if(fullHtml){
                    return [200,fullHtml,'html'];
                }else{
                    throw new Error("🚦 coudlnt get sessionDeleted template 🚦");
                }
            }else{
                throw new Error("🚦 coudlnt get sessionDeleted template 🚦");
            }
        }else{
            throw new Error("🚦 get method only 🚦");
        }
    } catch (err) {
        console.log("sessionDeleted ERROR", err);
        return [405,undefined,'html'];
    }

}
//   public handlers
handlers.public = async (data) => {
    if(data.method == 'get'){
        var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        trimmedAssetName = trimmedAssetName.replace(' ','');
        if(trimmedAssetName.length > 0){
            try {
                const staticResult = await helpers.getStaticAsset(trimmedAssetName);
                
                var contentType = 'plain';

                if(trimmedAssetName.indexOf('.css') > -1){
                    contentType = 'css';
                }
                if(trimmedAssetName.indexOf('.png') > -1){
                    contentType = 'png';
                }
                if(trimmedAssetName.indexOf('.jpg') > -1){
                    contentType = 'jpg';
                }
                if(trimmedAssetName.indexOf('.ico') > -1){
                    contentType = 'favicon';
                }
                return [200,staticResult,contentType];

            } catch (err) {
                throw err;
            }
        }else{
            return 404;
        }
    }else{
        console.log("Couldnt get public stuff");
        return 405;
    }
}
handlers.favicon = async (data) => {
    if(data.method == 'get'){
        try {
            const asset = await helpers.getStaticAsset('favicon.ico');
            return [200,asset,'favicon'];
        } catch (err) {
            return 500;
        }
        
    }else{
        return 405;
    }
}
// API MAIN

handlers.users = async (data) => {
    try {
        var acceptableMethods = ['post', 'get', 'put','delete'];
        if(acceptableMethods.indexOf(data.method) > -1){
            const submethodResult = await handlers._users[data.method](data);
            if(submethodResult){
                return [200,submethodResult];
            }else{
                throw new Error("🚦 submethod result is false 🚦");
            }
        }else{
            throw new Error("🚦 unacceptable method 🚦");
        }

    } catch (err) {
        console.log("Error from users", err);
        return 404;
    }
}
handlers.tokens = async (data) => {
    try {
        var acceptableMethods = ['post', 'get', 'put','delete'];
        if(acceptableMethods.indexOf(data.method) > -1){
            const submethodResult = await handlers._tokens[data.method](data);
            if(submethodResult){
                return [200,submethodResult];
            }else{
                throw new Error("🚦 submethod result failed 🚦");
            }
        }else{
            throw new Error("🚦 unacceptable method 🚦");
        }
    } catch (err) {
        console.log("Error from tokens", err);
        return 404;
    }
}
//  API SUBMETHODS
handlers._users.post = async (data) => {
   
    try {
        // deal with to and from data
        const dbResult = await _data.create('users','email',data);
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not create user 🚦");
        }
      

    } catch (err) {
        console.log("Error from users.post", err);
        return false;
    }
}
handlers._users.get = async (data) => {
    try {
        const dbResult = await _data.read('users','email');
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not get user 🚦");
        }
    } catch (err) {
        console.log("Error from users.get", err);
        return false;
    }
}
handlers._users.put = async (data) => {
    try {
        const dbResult = await _data.update('users','email',data);
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not update user 🚦");
        }

    } catch (err) {
        console.log("Error from users.put", err);
        return false;
    }
}
handlers._users.delete = async (data) => {
    try {
  
        const dbResult = await _data.delete('users','email');
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not delete user 🚦");
        }

    } catch (err) {
        console.log("Error from users.delete", err);
        return false;
    }
}
handlers._tokens.post = async (data) => {
    try {
          // deal with to and from data
          const dbResult = await _data.create('tokens','id',data);
          if(dbResult){
              return dbResult;
          }else{
              throw new Error("🚦 db could not create token 🚦");
          }
        
    } catch (err) {
        console.log("Error from tokens.post", err);
        return false;
    }
}
handlers._tokens.get = async (data) => {
    try {
        const dbResult = await _data.read('tokens','id');
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not get token 🚦");
        }
    } catch (err) {
        console.log("Error from tokens.get", err);
        return false;
    }
}
handlers._tokens.put = async (data) => {
    try {
        const dbResult = await _data.update('tokens','id',data);
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not update token 🚦");
        }

    } catch (err) {
        console.log("Error from tokens.put", err);
        return false;
    }
}
handlers._tokens.delete = async (data) => {
    try {
        const dbResult = await _data.delete('tokens','id');
        if(dbResult){
            return dbResult;
        }else{
            throw new Error("🚦 db could not delete token 🚦");
        }

    } catch (err) {
        console.log("Error from tokens.delete", err);
        return false;
    }
}
handlers._tokens.verifyToken = async (id,email) => {
    // lookup token
    try {
        const tokenResult = await _data.read('tokens',id);
        if(tokenResult){
            if(tokenResult.email == email && tokenResult.expires > Date.now()){
                return true;
    
            }else{
                return false;
    
            }
        }else{
            throw new Error("🚦 couldnot read token data from db 🚦");
        }
    } catch (err) {
        console.log("Error from VERIFY TOKEN", err);
        return false;
    }
    
}

module.exports = handlers;