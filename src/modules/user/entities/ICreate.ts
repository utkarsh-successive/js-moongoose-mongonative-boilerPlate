import IQueryBaseCreate from './IQueryBaseCreate';

interface ICreate extends IQueryBaseCreate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export default ICreate;
