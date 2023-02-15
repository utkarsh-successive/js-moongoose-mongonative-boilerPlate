import IEntity from '../../libs/entities/IEntity';

interface IUser extends IEntity {
  name: string;
  empId: string;
  email: string;
  mobile_no: number;
  address: object;
  age: number;
}

export default IUser;
