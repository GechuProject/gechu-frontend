import type { LucideIcon } from "lucide-react";
import { Gamepad2, Settings, Tag } from "lucide-react";

/** 이름 배열 → id 배열 (available 목록에서 이름이 일치하는 항목의 id 반환) */
export function preferenceNamesToIds(
  names: string[],
  availableList: { id: number; name: string }[]
): number[] {
  return names
    .map((name) => {
      const found = availableList.find((item) => item.name === name);
      return found ? found.id : -1;
    })
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
  availableGenres: string[];
  availablePlatforms: string[];
  availableThemes: string[];
}): PreferenceSectionConfig[] {
  return [
    {
      title: "선호 장르",
      icon: Gamepad2,
      items: state.availableGenres,
      selected: state.selectedGenres,
      setSelected: state.setSelectedGenres,
    },
    {
      title: "선호 플랫폼",
      icon: Settings,
      items: state.availablePlatforms,
      selected: state.selectedPlatforms,
      setSelected: state.setSelectedPlatforms,
    },
    {
      title: "선호 테마",
      icon: Tag,
      items: state.availableThemes,
      selected: state.selectedThemes,
      setSelected: state.setSelectedThemes,
    },
  ];
}
