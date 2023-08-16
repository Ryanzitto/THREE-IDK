import { useStoreApp } from "../../store";

export const Menu = () => {
  const { setGameStage, floorIsMounted } = useStoreApp();

  return (
    <div className="overlay bg-zinc-900/40">
      {floorIsMounted === true ? (
        <div className="menu-content flex flex-col gap-10">
          <h1 className="text-white font-bold text-5xl mb-10">IDK GAME</h1>
          <button
            onClick={() => {
              setGameStage("GAME");
            }}
            className="text-white border border-white text-5xl font-bold px-10 py-4 hover:opacity-60 transition-all"
          >
            START GAME
          </button>
          <button
            onClick={() => {
              setGameStage("LOJA");
            }}
            className="text-white border border-white text-5xl font-bold px-10 py-4 hover:opacity-60 transition-all"
          >
            STORE
          </button>
        </div>
      ) : (
        <div className="overlay bg-zinc-900/40">
          <div className="menu-content flex flex-col gap-10">
            <h1 className="text-white font-bold text-5xl animate-bounce">
              LOADING THE EXPERIENCE... PLEASE WAIT.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
