import { flow, observable } from 'mobx';
import { State } from './type';
import { fetchMeta } from '@code-push/code-push';
import { navigate } from './navigator';

export class Home {
  @observable accessor state: State = {
    meta: null,
    get metaArray () {
      if (this.meta === null) {
        return [];
      }
      return Object.entries(this.meta).map(([name, meta]) => ({name, ...meta}));
    },
    isLoading: false,
    isSuccess: false,
  };

  @flow.bound
  *loadMeta() {
    try {
      this.state.isLoading = true;
      this.state.meta = yield fetchMeta();

      this.state.isSuccess = true;
    } catch (e) {
      console.log('e',e);
    } finally {
      this.state.isLoading = false;
    }
  }

  navigateToProfile = () => {
    navigate('Profile');
  };

  navigateToSettings = () => {
    navigate('Settings');
  };
}
