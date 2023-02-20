import IBaseDocument from '../../../libs/BaseRepo/IBaseDocument';

interface IUserModel extends IBaseDocument {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default IUserModel;
