import BaseRepository from "../libs/BaseRepo/BaseRepository";

class schemaValidation extends BaseRepository {
    // protected serviceCollection = {};

    protected collection ;

    constructor(collection) {
      super();
      this.collection = collection;
    }
    public set(){
        super.createCollection(this.collection);
    }
}    