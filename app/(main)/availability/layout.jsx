import { Suspense } from 'react';

export default function Availability({children}) {
    return(
        <div>
            <Suspense fallback={<div>Loading Events...</div>}>{children}</Suspense>
        </div>
    );
}
