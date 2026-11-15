import { cn } from "@/lib/utils";

const STYLES: Record<string, { label: string; tone: string }> = {
  "bar-1oz": { label: "1 OZ", tone: "from-[#f0d78c] via-[#c9a227] to-[#8a6a12]" },
  "bar-10oz": { label: "10 OZ", tone: "from-[#f3df9a] via-[#d4af37] to-[#9a7518]" },
  "bar-1kg": { label: "1 KG", tone: "from-[#efe0a8] via-[#c5a028] to-[#7d5f10]" },
  "bar-10g": { label: "10 G", tone: "from-[#f6e7b0] via-[#d8b84a] to-[#a07d20]" },
  "bar-1g": { label: "1 G", tone: "from-[#f8ecc0] via-[#e0c35a] to-[#b08928]" },
  "coin-maple": { label: "MAPLE", tone: "from-[#f2d88a] via-[#c9a227] to-[#8f6f16]" },
  "coin-krug": { label: "KRUG", tone: "from-[#e8c878] via-[#b8963e] to-[#7a5a14]" },
  "coin-eagle": { label: "EAGLE", tone: "from-[#f0d48a] via-[#c9a227] to-[#856412]" },
};

export function BullionVisual({
  imageKey,
  className,
  large,
}: {
  imageKey: string;
  className?: string;
  large?: boolean;
}) {
  const style = STYLES[imageKey] ?? {
    label: "GOLD",
    tone: "from-[#f0d78c] via-[#c9a227] to-[#8a6a12]",
  };
  const isCoin = imageKey.startsWith("coin");

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#1a1712]",
        large ? "aspect-[4/3]" : "aspect-square",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,220,140,0.18),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(0,0,0,0.55),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,transparent_0,transparent_2px,rgba(255,255,255,0.04)_2px,rgba(255,255,255,0.04)_3px)]" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className={cn(
            "relative flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
            isCoin
              ? "h-[58%] w-[58%] rounded-full border border-[#fff4c4]/40"
              : "h-[42%] w-[72%] rounded-sm border border-[#fff4c4]/35",
            `bg-gradient-to-br ${style.tone}`,
          )}
        >
          <div
            className={cn(
              "absolute inset-[10%] border border-[#fff8d8]/25",
              isCoin ? "rounded-full" : "rounded-[1px]",
            )}
          />
          <span className="font-[family-name:var(--font-display)] text-[clamp(0.85rem,2.5vw,1.35rem)] tracking-[0.22em] text-[#3a2a08]/90">
            {style.label}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
