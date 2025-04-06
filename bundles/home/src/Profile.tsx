import React, {Suspense} from 'react';
import { CPImport } from '@code-push/code-push';
import { Indicator } from './Indicator';

const ProfileScreenLazy = React.lazy(async () => {
    const data = await CPImport('profile');
    return {default: data.ProfileScreen};
});

export const ProfileScreen = () => {
    return (
        <Suspense fallback={<Indicator title={'Profile'} />}>
            <ProfileScreenLazy />
        </Suspense>
    );
};
