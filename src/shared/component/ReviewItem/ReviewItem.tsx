"use client";

import { useState } from "react";
import * as styles from "./ReviewItem.css";
import Chip from "@common/component/Chip/Chip";
import Profile from "@app/community/_component/Profile/Profile.tsx";
import Divider from "@common/component/Divider/Divider.tsx";
import { Separated } from "react-simplikit";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageGalleryModal from "@shared/component/ImageGalleryModal.tsx";

export interface ReviewItemType {
  id: number;
  memberId: number;
  nickname: string;
  breedName: string;
  petDisease: string;
  petAge: number; // notion 명세에 없음
  vistitedAt: string;
  hospitalId: number;
  hospitalName: string;
  hospitalAddress: string;
  content: string;
  visitPurpose: string;
  goodReviews: ReadonlyArray<{ id: number; name: string }>;
  badReviews: ReadonlyArray<{ id: number; name: string }>;
  images: ReadonlyArray<string>;
  symptoms: ReadonlyArray<{ id: number; name: string }>;
  diseases: ReadonlyArray<{ id: number; name: string }>;
  animal: string;
  gender: string;
  breed: string;
  weight: number;
}

interface propsType {
  handleProfileClick: () => void;
  handleHospitalDetailClick: () => void;
  reviewData: ReviewItemType;
  isBlurred?: boolean;
}

/**
 * 병원리뷰 컴포넌트
 * @param handleProfileClick  유저 프로필 클릭 시
 * @param handleHospitalDetailClick 병원 상세 클릭 시
 * @param reviewData 리뷰 데이터
 * @param isBlurred 리뷰가 블러 처리되어야 하는지 여부
 */
const HospitalReview = (props: propsType) => {
  const {
    handleProfileClick,
    handleHospitalDetailClick,
    reviewData,
    isBlurred = false,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageGalleryModalOpen, setIsImageGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageGalleryModalOpen(true);
  };
  const closeImageGalleryModal = () => {
    setIsImageGalleryModalOpen(false);
  };

  return (
    <section className={styles.reviewItemContainer}>
      <Profile
        handleProfileClick={handleProfileClick}
        createdAt={reviewData.vistitedAt}
        nickname={reviewData.nickname}
        breed={reviewData.breed}
        petAge={reviewData.petAge}
      />
      <article className={isBlurred ? styles.blurEffect : undefined}>
        <div
          className={styles.hospitalDetail}
          onClick={handleHospitalDetailClick}
        >
          <div className={styles.hospitalName}>{reviewData.hospitalName}</div>
          <div className={styles.hospitalAddress}>
            {reviewData.hospitalAddress}
          </div>
        </div>
        <div
          className={
            isExpanded ? styles.reviewContentExpanded : styles.reviewContent
          }
        >
          {reviewData.content}
        </div>
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          style={{ overflow: "hidden" }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.detailSection}>
            <ChipSection
              title="사전증상"
              items={reviewData.symptoms}
              color="border"
            />
            <ChipSection
              title="진단 내용"
              items={reviewData.diseases}
              color="border"
            />
            <PetInfo reviewData={reviewData} />
          </div>
        </motion.div>
        <div className={styles.detailButton} onClick={toggleExpand}>
          {isExpanded ? "접기" : "상세보기"}
        </div>
        <div className={styles.imagesContainer}>
          {reviewData.images.map((image, index) => (
            <Image
              key={`${image}-${index}`}
              className={styles.reviewImage}
              src={image}
              alt="Post image"
              width={76}
              height={76}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div className={styles.reviewChipsContainer}>
          {reviewData.goodReviews?.map((review) => (
            <Chip key={review.id} label={review.name} color="blue" disabled />
          ))}
          {reviewData.badReviews?.map((review) => (
            <Chip key={review.id} label={review.name} color="red" disabled />
          ))}
        </div>
        {/* 이미지 갤러리 모달 */}
        <ImageGalleryModal
          isOpen={isImageGalleryModalOpen}
          images={reviewData.images as string[]}
          currentIndex={currentImageIndex}
          onClose={closeImageGalleryModal}
        />
      </article>
    </section>
  );
};

/**
 * 동물 기본 정보
 */
const PetInfo = ({ reviewData }: { reviewData: ReviewItemType }) => (
  <div>
    <div className={styles.detailTitle}>동물 기본 정보</div>
    <div className={styles.petInfoContainer}>
      <Separated by={<Divider size="popular" />}>
        <div className={styles.petInfoCategory}>
          <p className={styles.petInfoLabel}>종</p>
          <p className={styles.petInfoValue}>{reviewData.breed}</p>
        </div>
        <div className={styles.petInfoCategory}>
          <p className={styles.petInfoLabel}>성별</p>
          <p className={styles.petInfoValue}>{reviewData.gender}</p>
        </div>
        <div className={styles.petInfoCategory}>
          <p className={styles.petInfoLabel}>동물</p>
          <p className={styles.petInfoValue}>{reviewData.animal}</p>
        </div>
        <div className={styles.petInfoCategory}>
          <p className={styles.petInfoLabel}>몸무게</p>
          <p className={styles.petInfoValue}>{reviewData.weight}</p>
        </div>
      </Separated>
    </div>
  </div>
);

/**
 * Chip Section (구조가 공통으로 반복되어 있음)
 * @param title
 * @param items
 * @param color
 * @constructor
 */
const ChipSection = ({
  title,
  items,
  color,
}: {
  title: string;
  items: ReadonlyArray<{ id: number; name: string }>;
  color: "border" | "blue" | "red";
}) => (
  <div>
    <div className={styles.detailTitle}>{title}</div>
    <div className={styles.detailContent}>
      {items.map((item) => (
        <Chip key={item.id} label={item.name} color={color} disabled />
      ))}
    </div>
  </div>
);

export default HospitalReview;
