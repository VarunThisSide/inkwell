import Skeleton from "react-loading-skeleton"

export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-3/4 m-4 px-4 py-2 rounded-4xl w-full max-w-3xl">
        <div className="flex items-center mb-3">
          <Skeleton circle width={32} height={32} />
          <div className="mx-2">
            <Skeleton width={120} height={14} />
          </div>
          <Skeleton width={80} height={14} />
        </div>
        <Skeleton height={32} width="80%" className="mb-3" />
        <Skeleton count={2} height={16} className="mb-3" />
        <Skeleton width={80} height={20} borderRadius={999} />
        <div className="bg-gray-100 h-0.5 w-4/5 mt-4"></div>
      </div>
    </div>
  )
}
