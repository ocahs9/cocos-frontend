"use client";

import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import * as styles from "./SelectPost.css.ts";
import Divider from "@common/component/Divider/Divider.tsx";
import {IcUnderline} from "@asset/svg";
import Content from "@common/component/Content/Content.tsx";
import {usePostPostFilters} from "@api/domain/community/search/hook.ts";
import {postPostFiltersResponse} from "@api/domain/community/search";
import {PATH} from "@route/path.ts";
import {formatTime} from "@shared/util/formatTime.ts";
import nocategory from "@asset/image/nocategory.png";
import Image from "next/image";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("@common/component/Loading/Loading.tsx"), { ssr: false });

const PostList = () => {
  const [isRecentPost, setIsRecentPost] = useState(true);
  const [posts, setPosts] = useState<NonNullable<postPostFiltersResponse["data"]>["posts"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // 페이지 이동

  const { mutate: fetchPosts } = usePostPostFilters();

  const fetchPostData = useCallback(() => {
    setIsLoading(true);
    const sortBy = isRecentPost ? "RECENT" : "POPULAR";

    fetchPosts(
      { sortBy },
      {
        onSuccess: (data) => {
          if (data) {
            const sortedPosts = [...data].sort((a, b) => {
              if (isRecentPost) {
                return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
              }
              if (b.likeCount === a.likeCount) {
                return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
              }
              return (b.likeCount ?? 0) - (a.likeCount ?? 0);
            });
            setPosts(sortedPosts);
          }
        },
        onError: (error) => {
          console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다:", error);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  }, [isRecentPost, fetchPosts]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <button
          type="button"
          className={styles.tabButton({ isActive: isRecentPost })}
          onClick={() => setIsRecentPost(true)}
        >
          최신글
          {isRecentPost && <IcUnderline className={styles.underline} />}
        </button>
        <button
          type="button"
          className={styles.tabButton({ isActive: !isRecentPost })}
          onClick={() => setIsRecentPost(false)}
        >
          인기글
          {!isRecentPost && <IcUnderline className={styles.underline} />}
        </button>
      </div>
      <Divider size="small" />

      {/* 게시물 리스트 */}
      <div className={styles.postList}>
        {isLoading ? (
          <Loading height={40} />
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <Content
              key={post.id}
              breed={post.breed}
              petAge={post.petAge}
              postTitle={post.title}
              postContent={post.content}
              likeCnt={post.likeCount}
              commentCnt={post.commentCount}
              postImage={post.image}
              likeIconType={post.category === "증상·질병" || post.category === "병원고민" ? "curious" : "support"}
              onClick={() => router.push(`${PATH.COMMUNITY.ROOT}/${post.id}`)}
              timeAgo={formatTime(post.createdAt as string)}
              category={post.category}
            />
          ))
        ) : (
          <div className={styles.emptyContainer}>
            <Image src={nocategory} alt="게시글 없음." width={276} height={155} style={{ objectFit: "cover" }} />
            <h1> 아직 등록된 게시글이 없어요 </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
