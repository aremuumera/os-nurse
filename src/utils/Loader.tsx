import React, { ComponentType, Suspense, LazyExoticComponent } from 'react';

export function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <svg
        className="animate-spin h-8 w-8 text-[#380A48]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
        ></path>
      </svg>
    </div>
  );
}







// Define the type for the component that will be lazily loaded
type LazyComponentType = LazyExoticComponent<ComponentType<any>>;

// Define the props for the HOC
interface WithLazyLoadingProps {
  fallback?: React.ReactNode;
}

// HOC function
const withLazyLoading = <P extends object>(
  LazyComponent: LazyComponentType,
  fallback: React.ReactNode = <Loading />
): React.FC<P & WithLazyLoadingProps> => {
  return (props: P & WithLazyLoadingProps) => (
    <Suspense fallback={props.fallback || fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazyLoading;