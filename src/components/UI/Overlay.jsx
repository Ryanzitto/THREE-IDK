import { useStoreApp } from "../../store";
export const Overlay = () => {
  const { gameStage, setGameStage } = useStoreApp();
  return (
    <>
      <div className="w-screen h-screen flex items-start justify-end overlayLoja pr-6 pt-6 z-50">
        <div className="bg-white/40 rounded-md w-[150px] h-[50px] flex items-center justify-center">
          <h1
            className="text-3xl text-white font-black tracking-widest cursor-pointer transition duration-[1500ms] hover:text-white/60"
            onClick={() => {
              setGameStage("LOJA");
            }}
          >
            STORE
          </h1>
        </div>
      </div>
    </>
  );
};
