import IQueryBaseList from './IQueryBaseList';

interface IQueryList extends IQueryBaseList {
  limit?: number;
  skip?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export default IQueryList;
