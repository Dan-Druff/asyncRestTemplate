

console.log("Hello From App.js");



var app = {};

app.client = {};

app.config = {
    'sessionToken' : false
}
app.client.request = (headers,path,method,queryStringObject,payload,callback) => {
    // Set defaults
    headers = typeof(headers) == 'object' && headers !== null ? headers : {};
    path = typeof(path) == 'string' ? path : '/';
    method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
    queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
    payload = typeof(payload) == 'object' && payload !== null ? payload : {};
    
    var requestUrl = path+'?';
    var counter = 0;
  
    for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

    // Form the http request as a JSON type
    var xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl, true);
    xhr.setRequestHeader("Content-type", "application/json");

    // For each header sent, add it to the request
    for(var headerKey in headers){
        if(headers.hasOwnProperty(headerKey)){
            xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
    }

    // If there is a current session token set, add that as a header
    if(app.config.sessionToken){
        xhr.setRequestHeader("token", app.config.sessionToken.id);
    }
  
    //HANDLE INCOMING RESPONSE FROM JSON REQUEST (below)
    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
            var statusCode = xhr.status;
            var responseReturned = xhr.responseText;
          console.log("xhr ready state changed!!!!")
          console.log("what is status code and response below: ");
          console.log(statusCode,responseReturned);

          if(callback){
              try {
                  var parsedResponse = JSON.parse(responseReturned);
                  callback(statusCode,parsedResponse);
              } catch (err) {
                    callback(statusCode,false);
                  console.log("error parsing data");
              }
          }
           
         
       
            
        }
    }


     // Send the payload as JSON
    var payloadString = JSON.stringify(payload);
    xhr.send(payloadString);
}
app.bindLogoutButton = function(){
    document.getElementById("logoutButton").addEventListener("click", function(e){

      
        e.preventDefault();
        app.logUserOut();
    
      });
};
app.logUserOut = function(redirectUser){
  
    // Set redirectUser to default to true
    redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;
  
    // Get the current token id
    var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
  
    // Send the current token to the tokens endpoint to delete it
    var queryStringObject = {
      'id' : tokenId
    };
    app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,returnedResponse){
           // Set the app.config token as false
           if(statusCode == 200){
            app.setSessionToken(false);
            // Send the user to the logged out page
            if(redirectUser){
                window.location = '/session/deleted';
            }
           }
         
    });


};
app.bindForms = () => {
  if(document.querySelector("form")){
      var allForms = document.querySelectorAll("form");
      for(var i = 0; i < allForms.length; i++){
          allForms[i].addEventListener("submit", function(e){
                // Stop it from submitting
                  e.preventDefault();

                  console.log("SUBMIT BUTTON PRESSED");

                  var formId = this.id;
                  var path = this.action;
                  var method = this.method.toUpperCase();
    
                  // Hide the error message (if it's currently shown due to a previous error)
                  document.querySelector("#"+formId+" .formError").style.display = 'none';

                  // Hide the success message (if it's currently shown due to a previous error)
                  if(document.querySelector("#"+formId+" .formSuccess")){
                      document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
                  }
                  var payload = {};

                  var elements = this.elements;
                  for(var i = 0; i < elements.length; i++){
                      if(elements[i].type !== 'submit'){
                        
                          // Determine class of element and set value accordingly
                          var theNumber = elements[i].type == 'number' ? parseInt(elements[i].value) : 0;
                          var elementIsChecked = elements[i].checked;
                          var nameOfElement = elements[i].name;
                          var elementValue = elements[i].type == 'text' || elements[i].type == 'password' || elements[i].type == 'hidden' ? elements[i].value : false;
                          var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
                          // var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
                          
                            
                          if(nameOfElement == '_method'){
                              method = elements[i].value;
                          }
                          if(formId == 'accountCreate'){
                            if(elementValue){
                              payload[nameOfElement] = elementValue;
                            }else{
                              console.log("empty string as a required field error");
                            }
                            if(nameOfElement == 'tos'){
                              if(elementIsChecked == true){
                                payload[nameOfElement] = true;
                              }else{
                                payload[nameOfElement] = false;
                                console.log("Must agree to TOS");
                              }
                            }
                          }
                          if(formId == 'accountEdit1'){
                            if(elementValue){
                              payload[nameOfElement] = elementValue;
                            }else{
                              console.log("element must have value");
                            }
                          }
                          if(formId == 'accountEdit2'){
                            if(elementValue){
                              payload[nameOfElement] = elementValue;
                            }
                          }
                          if(formId == 'accountEdit3'){
                            if(elementValue){
                              payload[nameOfElement] = elementValue;
                            }else{
                              console.log("element must have value");
                            }
                          }
                          if(formId == 'sessionCreate'){
                            if(elementValue){
                              payload[nameOfElement] = elementValue;
                            }
                          }
                          
                      }
                  }

                  var queryStringObject = method == 'DELETE' ? payload : {};
                 app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,returnedResult){
                    if(statusCode !== 200){
                        console.log("API RETURN IS NOT 200");
                        if(statusCode == 403){
                           // log the user out
                           app.logUserOut();
                        }else{
  
                          // Try to get the error from the api, or set a default error message
                          var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';
            
                          // Set the formError field with the error text
                          document.querySelector("#"+formId+" .formError").innerHTML = error;
            
                          // Show (unhide) the form error field on the form
                          document.querySelector("#"+formId+" .formError").style.display = 'block';
                        }
                      }else{
                              // If successful, send to form response processor
                              console.log("calling form processor with responsePayload",returnedResult);
                              app.formResponseProcessor(formId,payload,returnedResult);
                      }
                 });
            

                




     


          });
      }
  }
}
app.formResponseProcessor = (formId,requestPayload,reponsePayload) => {
    if(formId == 'accountCreate'){
      console.log("FORM RESPONSE PROCESSOR");
           // Take the email and password, and use it to log the user in
           var newPayload = {
            'email' : requestPayload.email,
            'password' : requestPayload.password
        };
        app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newReturnedResult){
            if(newStatusCode !== 200){
                // Set the formError field with the error text
                document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';
        
                // Show (unhide) the form error field on the form
                document.querySelector("#"+formId+" .formError").style.display = 'block';
              }else{
                app.setSessionToken(newReturnedResult);
                console.log("User succesully logged in, redirecting");
                window.location = '/';
              }
        });
      
  
    
  
      
    }
  
  
      if(formId == 'sessionCreate'){
        app.setSessionToken(reponsePayload);
        window.location = '/';
      }
      var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
      if(formsWithSuccessMessages.indexOf(formId) > -1){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  
      }
      if(formId == 'accountEdit1'){
      }
      if(formId == 'accountEdit2'){
      }
      if(formId == 'accountEdit3'){
        app.logUserOut(false);
        window.location = '/account/deleted';
      }
}
app.getSessionToken = () => {
    var tokenString = localStorage.getItem('token');
    if(typeof(tokenString) == 'string'){
      try{
        var token = JSON.parse(tokenString);
        app.config.sessionToken = token;
        if(typeof(token) == 'object'){
          app.setLoggedInClass(true);
        } else {
          app.setLoggedInClass(false);
        }
      }catch(e){
        console.log('Error on trycatch getSessionToken',e);
        app.config.sessionToken = false;
        app.setLoggedInClass(false);
      }
    }
}
app.setLoggedInClass = (add) => {
    var target = document.querySelector("body");
    if(add){
      target.classList.add('loggedIn');
    } else {
      target.classList.remove('loggedIn');
    }
}
app.setSessionToken = (token) => {
    console.log(typeof token);
    console.log("MAYBE type of above. Setting session token",token);
  
      app.config.sessionToken = token;
      var tokenString = JSON.stringify(token);
      localStorage.setItem('token',tokenString);
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
  
}
app.renewToken = async () => {
    var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
    console.log("Gonna renew token which is: ",currentToken);
    if(currentToken){
        // Update the token with a new expiration
      var payload = {
        'id' : currentToken.id,
        'extend' : true,
      };
      console.log("Calling tokens put with payload of: ",payload);
      app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
        if(statusCode == 200){
          app.setSessionToken(responsePayload);

          return false;
        }else{
          app.setSessionToken(false);
          return true;
        }
      });

    }else{
      console.log("In renew token, and current token is false");
        app.setSessionToken(false);
        return true;
    }
}
app.loadDataOnPage = () => {
    // Get the current page from the body class
    var bodyClasses = document.querySelector("body").classList;
    var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
    if(primaryClass == 'accountEdit'){
      app.loadAccountEditPage();
  
    }
   
  
}
app.loadAccountEditPage = () => {
    var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
    if(email){
        var queryStringObject = {
            'email' : email
          };
          app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,returnedResponse){

            if(statusCode == 200){
                // Put the data into the forms as values where needed
                document.querySelector("#accountEdit1 .usernameInput").value = returnedResponse.username;
                document.querySelector("#accountEdit1 .phoneInput").value = returnedResponse.phone;
                document.querySelector("#accountEdit1 .displayEmailInput").value = email;
    
                // Put the hidden phone field into both forms
                var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
                for(var i = 0; i < hiddenEmailInputs.length; i++){
                      hiddenEmailInputs[i].value = email;
                    }
                }else{
                  // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
                  app.logUserOut();
                }
          });
       
     
    }else{
        app.logUserOut();
    }
}
app.tokenRenewalLoop = async () => {
    setInterval(function(){
        app.renewToken().then((renewalResult) => {
            if(!renewalResult){
                console.log("Token renewed successfully @ "+Date.now());
              }else{
                  console.log("Token did NOT renew successfully");
              }
        }).catch((err) => {
            console.log("TOKEN RENEWAL ERROR",err);

        })
       
       
      },1000 * 60);
}
app.init = () => {

    
    app.bindForms();
    app.bindLogoutButton();
    app.getSessionToken();
    app.tokenRenewalLoop();
    app.loadDataOnPage();
}
window.onload = () => {
    app.init();
}