import {Entity} from '@app/features/qcm-rest-api/model/entity';

export class Account extends Entity {

  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  company: string;
  version: number;

}

