import { cn } from "@/lib/utils";

const STYLES: Record<string, { label: string; sub: string }> = {
  "bar-1oz": { label: "1 OZ", sub: "FINE GOLD" },
  "bar-10oz": { label: "10 OZ", sub: "FINE GOLD" },
  "bar-1kg": { label: "1 KG", sub: "FINE GOLD" },
  "bar-10g": { label: "10 G", sub: "FINE GOLD" },
  "bar-1g": { label: "1 G", sub: "FINE GOLD" },
  "coin-maple": { label: "MAPLE", sub: "1 OZ · 999.9" },
  "coin-krug": { label: "KRUGERRAND", sub: "1 OZ · 22K" },
  "coin-eagle": { label: "EAGLE", sub: "1 OZ · 22K" },
};

export function BullionVisual({
  imageKey,
  className,
  large,
  hero,
}: {
  imageKey: string;
  className?: string;
  large?: boolean;
  hero?: boolean;
}) {
  const style = STYLES[imageKey] ?? { label: "GOLD", sub: "BULLION" };
  const isCoin = imageKey.startsWith("coin");

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#14110e]",
        !hero && (large ? "aspect-[5/4]" : "aspect-[5/4]"),
        hero && "h-full w-full",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,rgba(232,213,163,0.2),transparent_50%),radial-gradient(ellipse_at_75%_80%,rgba(0,0,0,0.65),transparent_55%)]" />
      <div className="metal-glow absolute left-1/2 top-[42%] h-[38%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84a]/20 blur-3xl" />

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          hero ? "p-[8%]" : "p-[12%]",
        )}
      >
        {isCoin ? (
          <div
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-full",
              hero ? "w-[min(42%,420px)]" : "w-[78%]",
            )}
          >
            <div className="absolute inset-0 rounded-full bg-black/40 blur-xl" />
            <div className="metal-bar relative flex h-full w-full items-center justify-center rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-8px_20px_rgba(80,50,0,0.35)]">
              <div className="absolute inset-[7%] rounded-full border border-[#fff6d0]/35" />
              <div className="absolute inset-[14%] rounded-full border border-[#5a4010]/25" />
              <div className="text-center">
                <p className="font-[family-name:var(--font-display)] text-[clamp(0.9rem,2.2vw,1.5rem)] tracking-[0.2em] text-[#3a2a08]">
                  {style.label}
                </p>
                <p className="mt-1 text-[0.55rem] font-semibold tracking-[0.24em] text-[#5c4514]/80">
                  {style.sub}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative",
              hero ? "w-[min(58%,560px)]" : "w-full",
            )}
          >
            <div className="absolute -bottom-4 left-[8%] right-[8%] h-6 rounded-[100%] bg-black/50 blur-lg" />
            <div
              className={cn(
                "metal-bar relative overflow-hidden rounded-[2px] shadow-[0_28px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,248,220,0.55),inset_0_-10px_24px_rgba(70,45,0,0.35)]",
                hero ? "aspect-[2.35/1]" : "aspect-[2.2/1]",
              )}
            >
              <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-[#5a4010]/35 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#3a2a08]/25 to-transparent" />
              <div className="absolute inset-[9%] border border-[#fff8d8]/28" />
              <div className="absolute inset-x-[14%] top-[18%] h-px bg-[#fff8d8]/25" />
              <div className="absolute inset-x-[14%] bottom-[18%] h-px bg-[#5a4010]/2" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1rem,2.6vw,1.85rem)] tracking-[0.28em] text-[#2f2208]">
                  {style.label}
                </p>
                <p className="mt-1.5 text-[0.58rem] font-semibold tracking-[0.32em] text-[#5c4514]/85">
                  {style.sub}
                </p>
                <p className="mt-3 text-[0.5rem] tracking-[0.35em] text-[#4a3810]/70">
                  KANANGA · ASSAYED
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60" />
            </div>
          </div>
        )}
      </div>

      {!hero && (
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
      )}
    </div>
  );
}
