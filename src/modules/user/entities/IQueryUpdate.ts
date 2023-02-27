import IQueryBaseUpdate from './IQueryBaseUpdate';

interface IQueryUpdate extends IQueryBaseUpdate {
  name?: string;
  email?: string;
  mobile_no?: number;
  address?: object;
  age?: number;
  empId?: string;
}

export default IQueryUpdate;
