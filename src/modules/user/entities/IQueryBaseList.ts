import IQueryEntity from './IQueryEntity';

interface IQueryBaseList extends IQueryEntity {
  limit?: number;
  skip?: number;
  id?: any;
}

export default IQueryBaseList;
