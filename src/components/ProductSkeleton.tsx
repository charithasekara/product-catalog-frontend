import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
          </div>
          <div className="h-4 bg-gray-200 rounded-full w-1/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-5/6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
            </div>
          </div>
          <div className="pt-4">
            <div className="h-8 bg-gray-200 rounded-md w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
            </div>
            <div className="mt-4 flex gap-3">
              <div className="h-10 bg-gray-200 rounded-md flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
              </div>
              <div className="h-10 bg-gray-200 rounded-md flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
