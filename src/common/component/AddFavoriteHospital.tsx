import { IcPlus } from "@asset/svg";
import * as styles from "../../app/mypage/_style/mypage.css";
import React, { useRef, useState } from "react";
import SearchHospital, { Hospital } from "@shared/component/SearchHospital/SearchHospital";
import { useGetFavoriteHospital, usePatchFavoriteHospital } from "@api/shared/hook";

import LazyImage from "@common/component/LazyImage";
import PlusHopitalSrc from "@asset/image/plusHospital.png";
import { PATH } from "@route/path";
import { useRouter } from "next/navigation";

interface AddFavoriteHospitalPropTypes {
  nickname: string;
  isMyPage?: boolean;
}

const AddFavoriteHospital = ({ nickname, isMyPage = true }: AddFavoriteHospitalPropTypes) => {
  const [isHospitalSearchBottomSheetOpen, setIsHospitalSearchBottomSheetOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const prevSelectedHospital = useRef<Hospital | null>(null);
  const router = useRouter();

  const { mutate } = usePatchFavoriteHospital();
  const { data } = useGetFavoriteHospital(nickname);

  const handleClickContainer: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!isMyPage) {
      data?.id && router.push(`${PATH.HOSPITAL.ROOT}/${data.id}`);
      return;
    }
    setIsHospitalSearchBottomSheetOpen(true);
  };

  const handleCloseHospitalSearchBottomSheet = () => {
    setIsHospitalSearchBottomSheetOpen(false);
  };

  const handleClickConfirm = () => {
    if (!selectedHospital?.id) return;
    if (prevSelectedHospital.current?.id !== selectedHospital?.id) {
      prevSelectedHospital.current = selectedHospital;
      mutate(selectedHospital.id);
    }
    handleCloseHospitalSearchBottomSheet();
  };

  const handleSelectHospital = (hospital: Hospital | null) => {
    setSelectedHospital(hospital);
  };

  return (
    <div className={styles.favoriteHospitalContainer} onClick={handleClickContainer}>
      {data ? (
        <div className={styles.addBox}>
          <LazyImage src={PlusHopitalSrc} alt="plusHosptial" width="2rem" height="2rem" />
          자주 방문하는 병원
        </div>
      ) : (
        <div className={styles.addBox}>
          {isMyPage ? (
            <>
              <IcPlus width={20} height={20} />
              자주 방문하는 병원
            </>
          ) : (
            <span className={styles.grayText}>자주 방문한 병원이 없어요</span>
          )}
        </div>
      )}
      {/* 병원 검색 바텀시트 */}
      <SearchHospital
        active={isHospitalSearchBottomSheetOpen}
        onConfirm={handleClickConfirm}
        onCloseBottomSheet={handleCloseHospitalSearchBottomSheet}
        selectedHospital={selectedHospital}
        onSelectHospital={handleSelectHospital}
        initialId={data?.id}
      />
    </div>
  );
};

export default AddFavoriteHospital;
