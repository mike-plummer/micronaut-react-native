import { authWatchers } from '../app/store/auth/auth.sagas';

export default function* root() {
  yield [
    authWatchers
  ].reduce((accumulator, child) => [...accumulator, ...child], []);
}