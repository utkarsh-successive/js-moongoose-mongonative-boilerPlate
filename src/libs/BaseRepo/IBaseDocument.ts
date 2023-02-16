import * as mongoose from 'mongoose';

interface IVersionableDocument extends mongoose.Document {
  deletedAt: Date;
}

export default IVersionableDocument;
