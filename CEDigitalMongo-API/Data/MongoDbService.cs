using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Driver;

namespace CEDigitalMongo_API.Data
{
    public class MongoDbService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? database;
        private IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration) {

            _configuration = configuration;

            var connetionString = _configuration.GetConnectionString("DbConnection");
            var mongoUrl = MongoUrl.Create(connetionString);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(mongoUrl.DatabaseName);

        }

        public IMongoDatabase? Database => _database;

    }
}
