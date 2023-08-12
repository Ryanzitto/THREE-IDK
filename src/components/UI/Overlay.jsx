import { useStoreApp } from "../../store";

export const Overlay = () => {
  const { dollarCount } = useStoreApp();
  return (
    <>
      <div className="flex items-start justify-end overlayLoja pr-6 pt-6 z-50 ">
        <div className="w-56 h-20 bg-white/80 backdrop-blur-md flex flex-col justify-center items-center rounded-md">
          <h1 className="text-zinc-500 text-3xl font-black tracking-wider">
            {dollarCount}
          </h1>
          <h1 className="text-zinc-500 text-xl font-bold tracking-wider">
            DEV-COINS
          </h1>
        </div>
      </div>
    </>
  );
};
