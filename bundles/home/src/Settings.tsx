import React, {Suspense} from 'react';
import { Indicator } from './Indicator';
import { CPImport } from '@code-push/code-push';

const SettingsScreenLazy = React.lazy(async () => {
    const data = await CPImport('settings');
    return {default: data.SettingsScreen};
});

export const SettingsScreen = () => {
    return (
        <Suspense fallback={<Indicator title={'Settings'} />}>
            <SettingsScreenLazy />
        </Suspense>
    );
};
