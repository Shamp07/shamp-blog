import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import * as T from '@types';

const useStores = () => useContext(MobXProviderContext) as T.Store;
export default useStores;
