import { IcPlus } from "@asset/svg";
import * as styles from "../_style/mypage.css";
import React, { useEffect, useState } from "react";
import LazyImage from "@common/component/LazyImage";
import Lung from "@asset/image/lung.png";
import Liver from "@asset/image/liver.png";
import { useGetPetInfo } from "@api/domain/mypage/hook";
import { useDiseaseSymptomFilterStore } from "./DiseaseSymptomBottomSheet/_store/categoryFilter";
import DiseasesSymptomBottomSheet from "./DiseaseSymptomBottomSheet/DiseaseSymptomBottomSheet";
import { useGetBodies, useGetDisease, useGetSymptoms } from "@api/domain/mypage/edit-pet/hook";

interface InterestedDiseasesPropTypes {
  nickname: string;
}

const InterestedDiseases = ({ nickname }: InterestedDiseasesPropTypes) => {
  // 표시용(프로필 주인 기준)
  const { data } = useGetPetInfo(nickname);
  // 패치/수정 기준(내 반려동물 기준)
  const { data: petAllInfo } = useGetPetInfo();

  const { setOpen, setSelectedChips, setCategory, setCategoryData } = useDiseaseSymptomFilterStore();

  const [bodyDiseaseIds, setBodyDiseaseIds] = useState<number[]>([]);
  const [bodySymptomsIds, setBodySymptomsIds] = useState<number[]>([]);

  const { data: diseaseBodies } = useGetBodies("DISEASE");
  const { data: symptomBodies } = useGetBodies("SYMPTOM");
  const { data: symptoms } = useGetSymptoms(bodySymptomsIds);
  const { data: disease } = useGetDisease(bodyDiseaseIds);

  // body id 목록 세팅(증상/질병)
  useEffect(() => {
    if (diseaseBodies?.bodies && symptomBodies?.bodies) {
      const diseaseIdArr = diseaseBodies.bodies.map((item) => item.id as number);
      const symptomIdArr = symptomBodies.bodies.map((item) => item.id as number);
      if (diseaseIdArr.length && symptomIdArr.length) {
        setBodyDiseaseIds(diseaseIdArr);
        setBodySymptomsIds(symptomIdArr);
      }
    }
  }, [diseaseBodies, symptomBodies]);

  // store의 categoryData 채우기(edit-pet/page.tsx 패턴)
  useEffect(() => {
    if (symptoms?.bodies) {
      setCategoryData("symptoms", symptoms.bodies);
    }
    if (disease?.bodies) {
      setCategoryData("disease", disease.bodies);
    }
  }, [symptoms, disease, setCategoryData]);

  const handleClickContainer: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!petAllInfo?.petId) return;
    setCategory("disease"); //항상 질병으로 먼저 열리도록

    if (petAllInfo.symptoms) {
      setSelectedChips({
        ids: petAllInfo.symptoms.map((item) => item.id),
        category: "symptomIds",
      });
    }

    if (petAllInfo.diseases) {
      setSelectedChips({
        ids: petAllInfo.diseases.map((item) => item.id),
        category: "diseaseIds",
      });
    }

    setOpen(true);
  };

  if (!data) return null;

  return (
    <>
      <div className={styles.favoriteHospitalContainer} onClick={handleClickContainer}>
        {data.diseases?.length ? (
          <div className={styles.addBox}>
            <div
              style={{
                position: "relative",
                width: `${data.diseases.length >= 2 ? "42px" : "24px"}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LazyImage
                style={{ position: "absolute", left: 0 }}
                src={Lung}
                alt="plusHosptial"
                width="2rem"
                height="2rem"
              />
              {data.diseases.length >= 2 && (
                <LazyImage
                  style={{ position: "absolute", left: "18px" }}
                  src={Liver}
                  alt="plusHosptial"
                  width="2rem"
                  height="2rem"
                />
              )}
            </div>
            관심 질병
          </div>
        ) : (
          <div className={styles.addBox}>
            <IcPlus width={20} height={20} />
            관심 질병
          </div>
        )}
      </div>

      {petAllInfo?.petId ? <DiseasesSymptomBottomSheet petId={petAllInfo.petId} /> : null}
    </>
  );
};

export default InterestedDiseases;
