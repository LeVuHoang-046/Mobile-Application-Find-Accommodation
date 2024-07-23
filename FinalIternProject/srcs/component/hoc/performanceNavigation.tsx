import React, {useEffect, useState} from 'react';

export type PerformanceNavigationHOC = {
  navigateFinish: boolean;
};

function performanceNavigation<T>(
  WrappedComponent: React.ComponentType<T & PerformanceNavigationHOC>,
) {
  return (props: T) => {
    const [navigateFinish, setNavigateFinish] = useState<boolean>(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setNavigateFinish(true);
      }, 100);
      return () => {
        clearTimeout(timer);
      };
    }, []);

    return <WrappedComponent {...props} navigateFinish={navigateFinish} />;
  };
}

export {performanceNavigation};
