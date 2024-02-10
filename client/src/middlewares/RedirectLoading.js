import React, { useEffect, useState } from 'react';
import FullLoading from "../components/FullLoading";

const RedirectLoading = () => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
            if (count === 0) {
                window.location.href = '/login';
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);

    return <FullLoading />;
};

export default RedirectLoading;
