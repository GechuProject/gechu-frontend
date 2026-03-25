// 한글 초성 목록
const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 한글 완성 음절의 초성 추출
function getChosung(str: string): string {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 0xac00 && code <= 0xd7a3) {
        // 완성형 한글 음절
        const offset = code - 0xac00;
        const chosungIndex = Math.floor(offset / (21 * 28));
        return CHOSUNG[chosungIndex];
      }
      return char;
    })
    .join("");
}

// 입력이 초성만으로 이루어졌는지 판별
export function isChosungOnly(str: string): boolean {
  if (!str.trim()) return false;
  return str.split("").every((char) => CHOSUNG.includes(char));
}

// 초성 매칭: title의 초성이 query 초성과 일치하는지 확인
export function matchesChosung(title: string, query: string): boolean {
  const titleChosung = getChosung(title);
  return titleChosung.includes(query);
}
