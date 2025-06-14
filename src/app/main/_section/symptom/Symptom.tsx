"use client";

import { useGetBodyParts } from "@api/domain/main/hook.ts";
import * as styles from "./Symptom.css.ts";
import { PATH } from "@route/path.ts";
import { components } from "@type/schema";
import { Suspense, useCallback, useEffect, useState } from "react";
import { usePostPostFilters } from "@api/domain/community/search/hook.ts";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function SymptomContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const typeId = searchParams.get("id");
  const [posts, setPosts] = useState<components["schemas"]["PostResponse"][]>([]);
  const { data: bodyParts } = useGetBodyParts("SYMPTOM");
  const router = useRouter();

  const { mutate: fetchPosts } = usePostPostFilters();

  const fetchPostData = useCallback(() => {
    if (!typeId) return;
    fetchPosts(
      { categoryId: Number(typeId) },
      {
        onSuccess: (data) => {
          setPosts(data);
        },
        onError: (error) => {
          console.error("데이터 가져오기 실패:", error);
        },
      },
    );
  }, [fetchPosts, typeId]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  if (!bodyParts?.data) {
    return null;
  }

  const body = bodyParts.data.bodies || [];

  return (
    <div className={styles.symptomContainer}>
      <p className={styles.symptomTitle}>증상이 나타나는 부위가 어딘가요?</p>
      <div className={styles.symptomGrid}>
        {body.slice(0, -2).map((bodyPart) => (
          <button
            key={bodyPart.id}
            className={styles.symptomItem}
            onClick={() => router.push(`${PATH.COMMUNITY.DETAIL}?type=symptom&id=${bodyPart.id}`)}
            aria-label={`증상 부위: ${bodyPart.name}`}
            type="button"
          >
            {bodyPart.image && <Image src={bodyPart.image} alt={`${bodyPart.name} 아이콘`} width={56} height={56} />}
            <p className={styles.symptomName}>{bodyPart.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const Symptom = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SymptomContent />
    </Suspense>
  );
};

export default Symptom;
