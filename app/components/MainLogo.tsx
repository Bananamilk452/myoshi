import { useState } from "react";
import { useInterval } from "~/hooks/useInterval";

export function MainLogo() {
  const [step, setStep] = useState(0);
  // 마이오시
  const text = [
    "ㅁ",
    "마",
    "망",
    "마이",
    "마잉",
    "마이오",
    "마이옷",
    "마이오시",
  ];

  useInterval(
    () => {
      setStep((prev) => prev + 1);
    },
    text.length - 1 == step ? null : 100,
  );

  return (
    <header className="flex min-w-[220px] flex-col">
      <h1 className="font-pixel text-[48px] font-bold leading-[48px]">
        {text[step]}
        {text.length - 1 == step && <span className="animate-onoff">_</span>}
      </h1>
      <h2 className="font-pixel text-violet-600">내 최애와 채팅하기!</h2>
    </header>
  );
}
