import { rules } from './setup.rules';
import { login } from './setup.login';
import { login as login2 } from './account.login';

export default {
  'setup:rules': rules,
  'setup:login': login,
  'account:login': login2,
};
