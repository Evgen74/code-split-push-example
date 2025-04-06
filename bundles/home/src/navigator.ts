import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// @ts-expect-error
export function navigate(...args) {
  if (navigationRef.isReady()) {
    // @ts-expect-error
    navigationRef.navigate(...args);
  }
}

export function back() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
