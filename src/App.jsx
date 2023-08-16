import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useMemo } from "react";
import { Menu } from "./components/UI/Menu";
import { useStoreApp } from "./store";
import { GameOver } from "./components/UI/GameOver";
import { Overlay } from "./components/UI/Overlay";
import { Loja } from "./components/UI/Loja";
import { useEffect } from "react";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
  audio: "audio",
};

function App() {
  useEffect(() => {
    setGameStage("MENU");

    return () => {
      setGameStage("MENU");
      setFloorIsMounted(false);
    };
  }, []);

  const {
    gameStage,
    floorIsMounted,
    experienceIsMounted,
    setGameStage,
    setFloorIsMounted,
  } = useStoreApp();
  const map = useMemo(() => [
    { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
    { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
    { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    { name: Controls.jump, keys: ["Space"] },
  ]);

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 8, 10], fov: 50 }}>
        <Suspense>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      {gameStage === "MENU" ? <Menu /> : null}
      {gameStage === "GAME" ? <Overlay /> : null}
      {gameStage === "GAME OVER" ? <GameOver /> : null}
      {gameStage === "LOJA" ? <Loja /> : null}
    </KeyboardControls>
  );
}

export default App;
