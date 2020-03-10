import configureStore from './configure-store';
import { INITIAL_STATE } from '../../common/app-const';

const store = configureStore(INITIAL_STATE);

export default store;
