"use client";

import HeaderNav from "@common/component/HeaderNav/HeaderNav";
import { IcLeftarrow } from "@asset/svg";
import reviewNoticeFrame from "@asset/image/reviewNoticeFrame.png";
import danger from "@asset/image/danger.png";
import Image from "next/image";
import Divider from "@common/component/Divider/Divider";
import { Button } from "@common/component/Button";
import * as style from "./style.css";
import { IcCheckbox } from "@asset/svg";
import { useState, useEffect } from "react";
import { TITLE, CHECKBOX_TEXTS } from "@app/review/agree/constant";
import { useAgreeReviewMutation } from "@app/api/review/agree/hook";
import { useRouter } from "next/navigation";
import { PATH } from "@route/path";
import { useGetReviewAgreementStatus } from "@app/api/review/agree/hook";

const page = () => {
  const CHECKBOX_COUNT = CHECKBOX_TEXTS.length;
  const [checkedBoxes, setCheckedBoxes] = useState<boolean[]>(Array(CHECKBOX_COUNT).fill(false));

  const mutation = useAgreeReviewMutation();
  const router = useRouter();

  const isReviewAgree = useGetReviewAgreementStatus();

  // url 입력해서 들어오는 경우 방지
  useEffect(() => {
    if (isReviewAgree) {
      router.push(PATH.REVIEW.WRITE);
    }
  }, [isReviewAgree]);

  const handleClickBtn = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        router.push(PATH.REVIEW.WRITE);
      },
    });
  };

  const handleGoHospitalDetail = () => {
    router.back();
  };

  const allChecked = checkedBoxes.every((v, i) => i === 0 || v);
  const ALL_CHECKBOX_INDEX = 0;
  const DIVIDER_AFTER_CHECKBOX_INDEX = 1;

  const handleToggleAll = () => {
    const newValue = !allChecked;
    setCheckedBoxes(Array(CHECKBOX_COUNT).fill(newValue));
  };

  const handleToggleItem = (id: number) => {
    const updated = [...checkedBoxes];
    updated[id] = !updated[id];

    const subChecks = updated.slice(ALL_CHECKBOX_INDEX + 1);
    updated[0] = subChecks.every(Boolean);

    setCheckedBoxes(updated);
  };

  return (
    <div className={style.backgroundColor}>
      <HeaderNav
        centerContent="후기 작성 유의사항"
        type="noBackground"
        leftIcon={<IcLeftarrow style={{ width: 24, height: 24 }} onClick={handleGoHospitalDetail} />}
      />
      <div className={style.wrapper}>
        <section className={style.topLayout}>
          <Image src={danger} alt="주의 표시" className={style.dangerImg} />
          <h2>{TITLE.main}</h2>
          <h2 className={style.title}>{TITLE.sub}</h2>
          <p className={style.docs}>{TITLE.descriptions[0]}</p>
          <p className={style.docs}>{TITLE.descriptions[1]}</p>
        </section>
        <Image src={reviewNoticeFrame} alt="리뷰작성 유의사항 이미지" priority className={style.mainImg} />
        <section className={style.bottomLayout}>
          {CHECKBOX_TEXTS.map((text, idx) => (
            <div key={idx}>
              {idx === DIVIDER_AFTER_CHECKBOX_INDEX && (
                <div className={style.dividerWrapper}>
                  <Divider size="small" />
                </div>
              )}
              <div
                className={style.checkbox}
                onClick={() => (idx === ALL_CHECKBOX_INDEX ? handleToggleAll() : handleToggleItem(idx))}
              >
                <IcCheckbox checked={checkedBoxes[idx]} className={style.check} />
                <span>
                  <span className={style.red}>(필수)</span> {text}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className={style.buttonLayout}>
        <Button label="다음으로" disabled={!allChecked} onClick={handleClickBtn} />
      </section>
    </div>
  );
};
export default page;
