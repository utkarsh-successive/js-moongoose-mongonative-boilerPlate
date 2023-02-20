import IEntity from '../../libs/entities/IEntity';

interface IUser extends IEntity {
  first_name: string;
  last_name: string;
  email: string;
}

export default IUser;
