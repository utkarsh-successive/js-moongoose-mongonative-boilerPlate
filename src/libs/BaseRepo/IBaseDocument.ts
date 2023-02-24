import * as mongoose from 'mongoose';

interface IVersionableDocument extends mongoose.Document {
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}

export default IVersionableDocument;
