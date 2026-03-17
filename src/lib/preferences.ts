import type { LucideIcon } from "lucide-react";
import { Gamepad2, Settings, Tag } from "lucide-react";
import {
  availableGenres,
  availablePlatforms,
  availableThemes,
} from "@/src/mocks/data/preferences";

/** 이름 배열 → id 배열 (available 목록 인덱스+1) */
export function preferenceNamesToIds(
  names: string[],
  availableList: string[]
): number[] {
  return names
    .map((name) => availableList.indexOf(name) + 1)
    .filter((id) => id > 0);
}

/** 취향 토글: 리스트에 있으면 제거, 없으면 추가 */
export function togglePreferenceSelection(
  item: string,
  list: string[],
  setList: (list: string[]) => void
): void {
  if (list.includes(item)) {
    setList(list.filter((i) => i !== item));
  } else {
    setList([...list, item]);
  }
}

export interface PreferenceSectionConfig {
  title: string;
  icon: LucideIcon;
  items: string[];
  selected: string[];
  setSelected: (list: string[]) => void;
}

/** 취향 섹션 설정 (온보딩/마이페이지 모달 공통) */
export function getPreferenceSections(state: {
  selectedGenres: string[];
  selectedPlatforms: string[];
  selectedThemes: string[];
  setSelectedGenres: (v: string[]) => void;
  setSelectedPlatforms: (v: string[]) => void;
  setSelectedThemes: (v: string[]) => void;
}): PreferenceSectionConfig[] {
  return [
    {
      title: "선호 장르",
      icon: Gamepad2,
      items: availableGenres,
      selected: state.selectedGenres,
      setSelected: state.setSelectedGenres,
    },
    {
      title: "선호 플랫폼",
      icon: Settings,
      items: availablePlatforms,
      selected: state.selectedPlatforms,
      setSelected: state.setSelectedPlatforms,
    },
    {
      title: "선호 테마",
      icon: Tag,
      items: availableThemes,
      selected: state.selectedThemes,
      setSelected: state.setSelectedThemes,
    },
  ];
}

export { availableGenres, availablePlatforms, availableThemes };
