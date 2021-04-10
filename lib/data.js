

// CONNECT TO DB HERE



var dbhandlers = {};

dbhandlers.create = async (collection,document,data) => {

    try {
        return {"SUCCESS":"Pretend DB Create"};
    } catch (err) {
        console.log("DB Create Error ",err);
        return false;
    }

}
dbhandlers.read = async (collection,document) => {
    try {
        return {"SUCCESS":"Pretend DB Read"};
        // or maybe return false if you're checking for doc
        // return false;
    } catch (err) {
        console.log("DB READ Error",err);
        return false;
    }
}
dbhandlers.update = async (collection,document,data) => {
    try {
      return {"SUCCESS":"Pretend DB Update"};
        
    } catch (err) {
        console.log("DB Update Error ",err);
        return false;
    }
}
dbhandlers.delete = async (collection,document) => {
    try {
       return {"SUCCESS":"Pretend DB DELETE"};
    } catch (err) {
        console.log("DB Delete Error ",err);
        return false;
    }
}
dbhandlers.list = async (collection,document) => {
    try {
        return {"Success":"Pretend listing Data"};
    } catch (err) {
        console.log("DB LIST Error ",err);
        return false;
    }
}



module.exports = dbhandlers;