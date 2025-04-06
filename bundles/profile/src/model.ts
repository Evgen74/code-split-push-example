import { makeAutoObservable } from 'mobx';
import { State } from './type';
import { navigate } from '@code-push/home';

export class Profile {
  state: State = {
    user: null,
  };

  constructor() {
    makeAutoObservable(this);

    this.state.user = {
      name: 'Dave',
      age: 32,
      lastname: 'Doe',
    };
  }

  navigateToSettings = () => {
    navigate('Settings');
  };
}
