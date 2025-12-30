import Skeleton from "react-loading-skeleton"

export const BlogPageSkeleton = () => {
  return (
    <div className="flex px-[5vw] py-8">
      <div className="w-[70%] flex flex-col">
        <Skeleton height={56} width="90%" className="my-2" />
        <Skeleton height={56} width="70%" className="my-2" />
        <Skeleton height={16} width={160} className="my-4" />
        <div className="px-4">
          <Skeleton count={8} height={18} className="mb-2" />
        </div>
      </div>
      <div className="w-px bg-gray-300 min-h-[75vh] mx-4"></div>
      <div className="w-[30%] flex flex-col px-[5vw]">
        <Skeleton width={80} height={16} className="my-4" />
        <div className="flex items-center">
          <Skeleton circle width={32} height={32} />
          <Skeleton width={140} height={20} className="mx-2" />
        </div>
      </div>
    </div>
  )
}
