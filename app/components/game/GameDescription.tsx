interface GameDescriptionProps {
  description: string;
}

/** 게임 소개 섹션 */
export function GameDescription({ description }: GameDescriptionProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-3xl font-bold text-white">게임 소개</h2>
      <p className="mb-6 text-lg leading-relaxed text-white/70">
        {description}
      </p>
    </div>
  );
}
