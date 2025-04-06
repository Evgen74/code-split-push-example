import { makeAutoObservable } from 'mobx';
import { State } from './type';

export class Settings {
  state: State = {
    isCPEnabled: false,
    isNotificationEnabled: true,
    isDarkMode: false,
    language: 'en',
  };

  constructor() {
    makeAutoObservable(this);
  }

  toggleNotifications = () => {
    this.state.isNotificationEnabled = !this.state.isNotificationEnabled;
  };

  toggleDarkMode = () => {
    this.state.isDarkMode = !this.state.isDarkMode;
  };

  toggleCP = () => {
    this.state.isCPEnabled = !this.state.isCPEnabled;
  };

  setLanguage = (lang: 'en' | 'es') => {
    this.state.language = lang;
  };
}
