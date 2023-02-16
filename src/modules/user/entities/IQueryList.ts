import IQueryBaseList from './IQueryBaseList';

interface IQueryList extends IQueryBaseList {
  limit?: number;
  skip?: number;
  title?: string;
  description?: string;
  status?: string;
}

export default IQueryList;
