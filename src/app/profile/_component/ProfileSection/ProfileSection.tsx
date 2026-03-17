"use client";
import * as styles from "../../_style/profile.css";
import * as favoriteHospitalStyles from "./FavoriteHospital.css";
import Divider from "@common/component/Divider/Divider";
import { Disease, MemberInfo, PetInfo } from "../../_hooks/useProfileState";
import { useRouter } from "next/navigation";
import { useGetFavoriteHospital, useGetRecentReview } from "@api/shared/hook";
import LazyImage from "@common/component/LazyImage";
import { IcChevronRight, IcClock } from "@asset/svg";
import InterestedDiseases from "@common/component/InterestedDiseases";
import AddFavoriteHospital from "@common/component/AddFavoriteHospital";

interface ProfileSectionProps {
  member?: MemberInfo;
  petInfo?: PetInfo;
}

const PetProfile = ({ petInfo }: { petInfo?: PetInfo }) => {
  if (!petInfo) return null;

  return (
    <div className={styles.animalProfileWrapper}>
      {petInfo.petImage && (
        <LazyImage
          className={styles.animalImage}
          alt="프로필이미지"
          src={petInfo.petImage}
          width="5.2rem"
          height="5.2rem"
        />
      )}
      <div className={styles.animalProfileTextWrapper}>
        <span className={styles.animalMainText}>
          <span className={styles.petSubInfo}> {` ${petInfo.petAge}살 된 `}</span>
          {`${petInfo.breed} `}
          <span className={styles.petSubInfo}>{petInfo.petName}</span>
        </span>
      </div>
    </div>
  );
};

const ProfileSection = ({ member, petInfo }: ProfileSectionProps) => {
  const { data } = useGetRecentReview(member?.nickname);

  if (!member) return null;

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileImageWrapper}>
        {member.profileImage && (
          <LazyImage
            className={styles.profileImage}
            alt="프로필 이미지"
            src={member.profileImage}
            width="3.2rem"
            height="3.2rem"
          />
        )}
        <span className={styles.userProfileTextWrapper}>
          <span className={styles.userProfileText}>{member.nickname}</span>
          <span className={styles.userProfileTextAssistive}>님의 반려동물</span>
        </span>
      </div>

      <div className={styles.loginProfileContainer}>
        {data?.data && (
          <div className={styles.userProfileImageWrapperHeader}>
            <IcClock width={14} height={14} />
            {`${data.data.diseaseBody} 시술 ${data.data.timeSinceVisit?.value}${data.data.timeSinceVisit?.unit === "DAY" ? "일" : "개월"}이 지났어요.`}
          </div>
        )}

        <div className={styles.userProfileContentBox}>
          <PetProfile petInfo={petInfo} />
          {petInfo && (
            <div className={styles.addInfoBox}>
              {member.nickname && <InterestedDiseases isMyPage={false} nickname={member.nickname} />}
              {member.nickname && <AddFavoriteHospital isMyPage={false} nickname={member.nickname} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

const FavoriteHospital = ({ nickname }: { nickname: string }) => {
  //리다이렉팅 url 연결하기
  const { data } = useGetFavoriteHospital(nickname);
  const router = useRouter();
  if (!data) return null;

  //todo: 병원 상세 페이지 URL 확정되면 상수값으로 대체하기 (현재는 임시)
  const handleClickContainer = () => {
    router.push(`/hospital-detail/${data.id}`);
  };

  return (
    <>
      <Divider size="small" />
      <div className={favoriteHospitalStyles.favoriteHospitalContainer} onClick={handleClickContainer}>
        <div className={favoriteHospitalStyles.redirectBox}>
          <div className={favoriteHospitalStyles.leftContentBox}>
            <span className={favoriteHospitalStyles.leftTopText}>즐겨찾는 병원</span>
            <span className={favoriteHospitalStyles.leftMiddleText}>{data.name}</span>
            <span className={favoriteHospitalStyles.leftBottomText}>{data.address}</span>
          </div>
        </div>
      </div>
    </>
  );
};
