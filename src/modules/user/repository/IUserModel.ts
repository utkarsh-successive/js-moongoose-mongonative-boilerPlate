import IBaseDocument from '../../../libs/BaseRepo/IBaseDocument';

interface IUserModel extends IBaseDocument {
  id: string;
  name: string;
  email: string;
  mobile_no: number;
  address: object;
  age: number;
}

export default IUserModel;
