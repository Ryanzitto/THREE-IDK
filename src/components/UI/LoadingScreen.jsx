export const LoadingScreen = () => {
  return (
    <div className="overlay bg-zinc-900/40">
      <div className="menu-content flex flex-col gap-10">
        <h1 className="text-white font-bold text-5xl animate-bounce">
          LOADING THE EXPERIENCE... PLEASE WAIT.
        </h1>
      </div>
    </div>
  );
};
