import Skeleton from "react-loading-skeleton"

export const BlogEditorSkeleton = () => {
  return (
    <div className="px-[15vw]">\
      <Skeleton
        height={64}
        width="70%"
        className="my-2"
      />
      <Skeleton
        height={220}
        width="100%"
        className="my-3 rounded-2xl"
      />
      <Skeleton height={18} width="95%" />
      <Skeleton height={18} width="90%" />
      <Skeleton height={18} width="85%" />
    </div>
  )
}
