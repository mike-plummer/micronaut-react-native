import { authWatchers } from '../app/store/auth/auth.sagas';
import { dataWatchers } from '../app/store/data/data.sagas';

export default function* root() {
  yield [
    authWatchers,
    dataWatchers
  ].reduce((accumulator, child) => [...accumulator, ...child], []);
}