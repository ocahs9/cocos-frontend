import { create } from "zustand";
import { CATEGORY_DISEASE, CATEGORY_SYMPTOM } from "@shared/component/FilterBottomSheet/CategoryContent/constant";
import { useCategoryFilterStore } from "@app/mypage/edit-pet/_store/categoryFilter";

// todo: 추후 타입들 분리하기
// 각 필터 항목의 기본 타입
export interface FilterItem {
  id?: number;
  name?: string;
}
export interface SymptomItem extends FilterItem {
  symptoms?: FilterItem[];
}
export interface DiseaseItem extends FilterItem {
  diseases?: FilterItem[];
}

// API로부터 GET 해오는 데이터 타입들 중 일부
export type CategorySymptom = SymptomItem[];
export type CategoryDisease = DiseaseItem[];

// 전체 categoryData의 타입
export interface CategoryData {
  symptoms: CategorySymptom;
  disease: CategoryDisease;
}

export type CategoryType = keyof CategoryData;

export interface SelectedChips {
  diseaseIds: number[];
  symptomIds: number[];
}

interface CategoryFilterState {
  isOpen: boolean;
  toggleOpen: () => void;
  setOpen: (state: boolean) => void;

  contentsType: "comment" | "subComment";
  setContentsType: (type: "comment" | "subComment") => void;

  category: CategoryType;
  setCategory: (category: CategoryType) => void;

  // 적용된 필터
  selectedChips: SelectedChips;
  toggleChips: (chip: { id: number; category: keyof SelectedChips }) => void;
  setSelectedChips: ({
    ids,
    category,
  }: {
    ids: (number | undefined)[] | undefined;
    category: keyof SelectedChips;
  }) => void;

  symptoms?: {
    id?: number;
    name?: string;
  }[];

  // 각 category에 해당하는 데이터 배열
  categoryData: CategoryData;
  setCategoryData: (category: CategoryType, data: CategorySymptom | CategoryDisease) => void;
}

//아예 같은 store로 바인딩(그래야 반려동물 수정페이지에서도 같은 선택된 칩 반영)
export const useDiseaseSymptomFilterStore = useCategoryFilterStore;
