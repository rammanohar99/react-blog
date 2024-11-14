import Skeleton from '../Skeleton/Skeleton';
import './LoadingState.css';

function PostSkeleton() {
  return (
    <div className="post-skeleton">
      <div className="post-skeleton__header">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
        />
        <div className="post-skeleton__meta">
          <Skeleton
            variant="text"
            width={120}
            height={20}
          />
          <Skeleton
            variant="text"
            width={80}
            height={16}
          />
        </div>
      </div>

      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
      />

      <div className="post-skeleton__content">
        <Skeleton
          variant="text"
          width="90%"
          height={20}
        />
        <Skeleton
          variant="text"
          width="95%"
          height={20}
        />
        <Skeleton
          variant="text"
          width="85%"
          height={20}
        />
      </div>
    </div>
  );
}

export default function LoadingState({ count = 3 }) {
  return (
    <div className="loading-state">
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}