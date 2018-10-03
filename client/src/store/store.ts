import { applyMiddleware, createStore, Store, Middleware } from 'redux';
import createSagaMiddlware, { SagaMiddleware } from 'redux-saga';
import sagas from './sagas';
import reducer from './reducer';
import { MRN } from '../model';

const sagaMiddleware: SagaMiddleware<any> = createSagaMiddlware();
const middleware: Middleware[] = [sagaMiddleware];

const configureStore = (): Store<MRN.State.State> => {
  const enhancers = applyMiddleware(...middleware);
  const store: Store<MRN.State.State> = createStore(reducer, {}, enhancers);
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore();