var debug= require('debug')('app:dao:db');
debug.log = console.log.bind(console);


exports = module.exports = buildDeveloperDao;


function buildDeveloperDao(collection){

    function convertDeveloperFrom(obj){
        obj.name = obj._id;
        delete obj._id;
        return obj;
    }

    function list(callback){
        collection.find().map(convertDeveloperFrom, callback);
    }

    function get(name, callback){
        collection.findOne({
            _id: name
        },function(err, developer){
            if(err)
                callback(err,null);
            else if(developer == null){
                var notFoundError = Error();
                notFoundError.status = 404;
                notFoundError.message = "Not Found";
                callback(notFoundError, null);
            }else
                callback(null, convertDeveloperFrom(developer));
        });
    }

    function create(name, param1, param2, callback){
        /*
         collection.save({_id : name, field1: field1, param1: param2 }, callback);
         */
    }

    function update(name, param1, param2, callback) {
        //collection.update({_id: name}, {$set: {field1: param1, field2: param2}}, callback);
    }

    function remove(name, callback){
        collection.remove({
            _id: name
        },true, callback);
    }

    return{
        list : list,
        get : get,
        create : create,
        update : update,
        remove : remove
    };

}
