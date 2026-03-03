interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface GameSidebarProps {
  price: string;
  systemRequirements: SystemRequirements;
}

/** 시스템 요구사항 + 가격 사이드바 */
export function GameSidebar({ price, systemRequirements }: GameSidebarProps) {
  const specs = [
    { label: "운영체제", value: systemRequirements.os },
    { label: "프로세서", value: systemRequirements.processor },
    { label: "메모리", value: systemRequirements.memory },
    { label: "그래픽", value: systemRequirements.graphics },
    { label: "저장공간", value: systemRequirements.storage },
  ];

  return (
    <div className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="mb-6 text-2xl font-bold text-white">시스템 요구사항</h3>

      <div className="space-y-4">
        {specs.map(({ label, value }) => (
          <div key={label}>
            <p className="mb-1 text-sm text-white/50">{label}</p>
            <p className="text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-white/50">가격</span>
          <span className="text-2xl font-bold text-[#E4FF30]">{price}</span>
        </div>
      </div>
    </div>
  );
}
