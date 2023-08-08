import { useStoreApp } from "../../store";

export const GameOver = () => {
  const { setGameStage } = useStoreApp();

  return (
    <div className="overlay bg-zinc-900/40">
      <div className="menu-content flex flex-col gap-10">
        <h1 className="text-white font-bold text-5xl mb-10">IDK GAME</h1>
        <h1 className="text-white font-bold text-5xl mb-10">
          GAME OVER, BOBÃO!
        </h1>
        <button
          onClick={() => {
            setGameStage("MENU");
          }}
          className="text-white border border-white text-5xl font-bold px-10 py-4 hover:opacity-60 transition-all"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
};
