import * as styles from "./PetHealth.css";
import { PetData } from "@page/registerPet/index/RegisterPet";
import { Button } from "@common/component/Button";
import Step1 from "./disease/Step1";
import Step2 from "./disease/Step2";
import SymStep1 from "./symptom/SymStep1";
import SymStep2 from "./symptom/SymStep2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@route/path";

interface PetHealthPropTypes {
  currentStep: number | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
  updatePetData: (field: keyof PetData, value: PetData[keyof PetData]) => void;
  isSkipDisease: boolean | null;
  handleSubmit: () => void;
}

const PetHealth = ({
  currentStep,
  setCurrentStep,
  setStep,
  updatePetData,
  handleSubmit,
  isSkipDisease,
}: PetHealthPropTypes) => {
  const [selectedBodyParts, setSelectedBodyParts] = useState<number[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<number[]>([]);

  const handleBodyPartSelection = (bodyPartId: number) => {
    setSelectedBodyParts((prevSelected) => {
      if (prevSelected.includes(bodyPartId)) {
        return prevSelected.filter((id) => id !== bodyPartId);
      }
      return [...prevSelected, bodyPartId];
    });
  };

  const handleDiseaseSelection = (diseaseId: number) => {
    setSelectedDiseases((prevSelected) => {
      if (prevSelected.includes(diseaseId)) {
        return prevSelected.filter((id) => id !== diseaseId);
      }
      if (prevSelected.length < 7) {
        return [...prevSelected, diseaseId];
      }
      return prevSelected;
    });
  };

  // 질병 1단계에서 질병유무 컴포넌트로
  const handleGoHealth = () => {
    setStep(5);
  };

  // 질병 1단계에서 질병 2단계로
  const handleNextFromStep1 = () => {
    console.log("Next button clicked");

    setCurrentStep(2);
  };

  // 질병 2단계에서 질병 1단계로
  const handleGoBack = () => {
    setCurrentStep(1);
  };

  // 질병 2단계에서 증상 1단계로
  const handleNextStep = () => {
    updatePetData("diseaseIds", selectedDiseases);
    setCurrentStep(3);
  };
  //////////////////////이제부터 증상
  const [selectedSymBodyParts, setSelectedSymBodyParts] = useState<number[]>([]);
  const [selectedSymptom, setSelectedSymptoms] = useState<number[]>([]);

  const handleBodyPartSymSelection = (bodyPartId: number) => {
    setSelectedSymBodyParts((prevSelected) => {
      if (prevSelected.includes(bodyPartId)) {
        return prevSelected.filter((id) => id !== bodyPartId);
      }
      return [...prevSelected, bodyPartId];
    });
  };

  const handleSymptomSelection = (symptomId: number) => {
    setSelectedSymptoms((prevSelected) => {
      if (prevSelected.includes(symptomId)) {
        return prevSelected.filter((id) => id !== symptomId);
      }
      if (prevSelected.length < 7) {
        return [...prevSelected, symptomId];
      }
      return prevSelected;
    });
  };

  // 질병 단계를 거치지 않았다면, 질병 유무 컴포넌트로
  // 질병 단계를 거쳤다면, 증상 1단계에서 질병 2단계로
  const handleGoBlank = () => {
    if (isSkipDisease === true) {
      setStep(5);
    } else {
      setCurrentStep(2);
    }
  };

  // 증상 1단계에서 2단계로
  const handleNextFromBodyPart = () => {
    setCurrentStep(4);
  };

  // 증상 2단계에서 1단계로
  const handleSymGoBack = () => {
    if (currentStep === 4) {
      setCurrentStep(3); // 증상 선택에서 부위 선택으로 돌아가기
    }
  };

  // 최종 폼 제출
  const navigate = useNavigate();
  const handleSymNextStep = () => {
    console.log("최종 증상 ID들:", selectedSymptom); // 폼 제출 전에 상태 확인
    updatePetData("symptomIds", selectedSymptom);
    handleSubmit();
    navigate(PATH.REGISTER_PET.COMPLETE);
  };

  return (
    <>
      {currentStep === 1 && (
        <>
          <Step1 selectedIds={selectedBodyParts} onBodyPartSelection={handleBodyPartSelection} />
          {/* // 돌아가기 구현 안됨 */}
          <div className={styles.btnWrapper}>
            <Button label="이전으로" size="large" variant="solidNeutral" disabled={false} onClick={handleGoHealth} />

            <Button
              label="다음"
              size="large"
              variant="solidPrimary"
              disabled={selectedBodyParts.length === 0}
              onClick={handleNextFromStep1}
            />
          </div>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Step2 selectedDiseases={selectedDiseases} onDiseaseSelection={handleDiseaseSelection} />
          <div className={styles.btnWrapper}>
            <Button label="이전으로" size="large" variant="solidNeutral" disabled={false} onClick={handleGoBack} />
            <Button
              label="다음"
              size="large"
              variant="solidPrimary"
              disabled={selectedDiseases.length === 0}
              onClick={handleNextStep}
            />
          </div>
        </>
      )}
      {currentStep === 3 && (
        <>
          <SymStep1 selectedIds={selectedSymBodyParts} onBodyPartSelection={handleBodyPartSymSelection} />
          <div className={styles.btnWrapper}>
            <Button label="이전으로" size="large" variant="solidNeutral" disabled={false} onClick={handleGoBlank} />
            <Button
              label="다음"
              size="large"
              variant="solidPrimary"
              disabled={selectedSymBodyParts.length === 0}
              onClick={handleNextFromBodyPart}
            />
          </div>
        </>
      )}
      {currentStep === 4 && (
        <>
          <SymStep2 selectedSymptom={selectedSymptom} onSymptomSelection={handleSymptomSelection} />
          <div className={styles.btnWrapper}>
            <Button label="이전으로" size="large" variant="solidNeutral" disabled={false} onClick={handleSymGoBack} />
            <Button
              label="다음"
              size="large"
              variant="solidPrimary"
              disabled={selectedSymptom.length === 0}
              onClick={handleSymNextStep} // 증상 선택 후 폼 제출
            />
          </div>
        </>
      )}
    </>
  );
};

export default PetHealth;
