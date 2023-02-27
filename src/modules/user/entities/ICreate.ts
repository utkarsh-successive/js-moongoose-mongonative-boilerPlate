import IQueryBaseCreate from './IQueryBaseCreate';

interface ICreate extends IQueryBaseCreate {
  name?: string;
  email?: string;
  mobile_no?: number;
  address?: object;
  age?: number;
}

export default ICreate;
