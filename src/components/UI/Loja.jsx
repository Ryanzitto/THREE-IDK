import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { Chest } from "../3D/Minecraft_chest";
import { Chicken } from "../3D/Chicken";
import { YoshiEgg } from "../3D/Yoshi_egg";
import { useState } from "react";
import { useStoreApp } from "../../store";

export const Loja = () => {
  const [filtro, setFiltro] = useState("COIN");
  const { gameStage, setGameStage } = useStoreApp();
  return (
    <>
      <div className="w-screen h-screen flex overlayLoja bg-white/40 justify-center items-center backdrop-blur-md">
        <div className="w-5/6 h-5/6 rounded-md border border-slate-300 flex flex-col">
          <div className="w-full h-20 flex justify-between items-center border-b border-slate-300 tracking-wider">
            <h1 className="font-bold text-xl text-zinc-400 pl-6 transition-colors hover:text-zinc-500">
              🛒 WELCOME TO SHOP
            </h1>
            <h2
              className="font-bold text-xl text-zinc-400 pr-6 cursor-pointer transition-colors hover:text-zinc-500"
              onClick={() => {
                setGameStage("GAME");
              }}
            >
              CLOSE
            </h2>
          </div>
          <div className="w-full h-16 flex justify-center items-center gap-6">
            <span
              className={`cursor-pointer rounded-md font-black text-lg text-zinc-700 transition-colors hover:text-opacity-80 px-2 ${
                filtro === "COIN"
                  ? "bg-white/60 border border-slate-300"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setFiltro("COIN");
              }}
            >
              COIN
            </span>
            <span
              className={`cursor-pointer rounded-md font-black text-lg text-zinc-700 transition-colors hover:text-opacity-80 px-2 ${
                filtro === "AVATAR"
                  ? "bg-white/60 border border-slate-300"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setFiltro("AVATAR");
              }}
            >
              AVATAR
            </span>
          </div>
          <div className="w-full h-full flex justify-center items-center gap-6">
            {filtro === "COIN" && (
              <>
                <Product scale={1.5} name={"Yoshi egg"} preco={"100"}>
                  <group position-y={-0.5}>
                    <YoshiEgg />
                  </group>
                </Product>
                <Product scale={2.5} name={"Chicken"} preco={"500"}>
                  <Chicken />
                </Product>
                <Product scale={0.015} name={"Minecraft chest"} preco={"200"}>
                  <Chest />
                </Product>
              </>
            )}
            {filtro === "AVATAR" && (
              <>
                <h1>NOTHING HERE </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const Product = ({ children, scale, name, preco }) => {
  return (
    <>
      <div className="w-64 h-80 bg-white/80 border border-slate-300 rounded-md text-center pt-2">
        <span className="font-bold text-xl text-zinc-400 transition-colors hover:text-zinc-500 block">
          {name}
        </span>
        <span className="font-semibold text-md text-zinc-400 transition-colors">
          Coin skin
        </span>
        <div className="w-full flex justify-center flex flex-col justify-center items-center">
          <div className="w-32 h-32 pt-4">
            <Canvas className="rounded-md">
              <Suspense>
                <Physics>
                  <OrbitControls
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                    autoRotate
                    rotateSpeed={1}
                  />
                  <Sky />
                  <ambientLight intensity={1} />
                  <group scale={scale}>{children}</group>
                </Physics>
              </Suspense>
            </Canvas>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="font-bold text-lg text-zinc-400 ">COST:</span>
            <span className="font-bold text-lg text-zinc-400 ">{preco}K</span>
          </div>

          <button className="mt-2 border border-slate-300 w-[60%] rounded-sm py-2 font-bold text-xl text-zinc-400 tracking-wide duration-[1000ms] hover:bg-zinc-700 hover:text-white hover:border-zinc-700">
            BUY
          </button>

          <div className="w-full flex justify-center mt-2">
            <span className="font-bold text-sm text-zinc-400  cursor-pointer transition-colors hover:text-zinc-500">
              {/* erro provavelmente acontece ... */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};