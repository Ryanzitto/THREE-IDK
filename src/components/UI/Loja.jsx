import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier";
import { ChestTeste } from "../3D/Chest2";
import { Chicken } from "../3D/Chicken";
import { YoshiEgg } from "../3D/Yoshi_egg";
import { useState } from "react";
import { useStoreApp } from "../../store";
import { Dollar } from "../3D/Dollar";
import { AvatarLoja } from "../3D/AvatarLoja";
import { PirateLoja } from "../3D/PirateLoja";

export const Loja = () => {
  const [filtro, setFiltro] = useState("COIN");
  const {
    gameStage,
    setGameStage,
    setBuy,
    productsOnStore,
    productsOnStore2,
    erro,
    dollarCount,
    resetErro,
    productsObtained,
    productsObtained2,
  } = useStoreApp();

  return (
    <>
      <div className="w-screen h-screen flex overlayLoja bg-white/40 justify-center items-center backdrop-blur-md">
        <div className="w-5/6 h-5/6 rounded-md border border-slate-300 flex flex-col">
          <div className="w-full h-20 flex justify-between items-center border-b border-slate-300 tracking-wider">
            <h1 className="font-bold text-xl text-zinc-400 pl-6 transition-colors hover:text-zinc-500">
              🛒 WELCOME TO SHOP | {dollarCount} COINS
            </h1>
            <h2
              className="font-bold text-xl text-zinc-400 pr-6 cursor-pointer transition-colors hover:text-zinc-500"
              onClick={() => {
                setGameStage("MENU");
                resetErro();
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
                <ProductCoin scale={0.5} name={"Dollars"} index={0}>
                  <group position-y={-0.5}>
                    <Dollar />
                  </group>
                </ProductCoin>
                <ProductCoin
                  scale={1.5}
                  name={"Yoshi egg"}
                  preco={"25"}
                  index={1}
                >
                  <group position-y={-0.5}>
                    <YoshiEgg />
                  </group>
                </ProductCoin>
                <ProductCoin
                  scale={0.015}
                  name={"Minecraft chest"}
                  preco={"50"}
                  index={2}
                >
                  <ChestTeste />
                </ProductCoin>
                <ProductCoin
                  scale={2.5}
                  name={"Chicken"}
                  preco={"100"}
                  index={3}
                >
                  <Chicken />
                </ProductCoin>
              </>
            )}
            {filtro === "AVATAR" && (
              <>
                <ProductAvatar scale={3} name={"Ryan Dev"} index={0}>
                  <group position-y={-1} rotation-x={-Math.PI / 2}>
                    <AvatarLoja />
                  </group>
                </ProductAvatar>
                <ProductAvatar scale={3} name={"Pirate"} preco={"50"} index={1}>
                  <group position-y={-1} rotation-x={Math.PI * 2}>
                    <PirateLoja />
                  </group>
                </ProductAvatar>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductCoin = ({ children, scale, name, preco, index }) => {
  const {
    gameStage,
    setGameStage,
    setBuy,
    productsOnStore,
    erro,
    setSkinCoin,
    skinCoinActual,
  } = useStoreApp();

  useEffect(() => {
    console.log(productsOnStore);
    console.log(skinCoinActual);
  }, [productsOnStore, erro, skinCoinActual]);
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
            {productsOnStore[index]?.bought === false && (
              <>
                <span className="font-bold text-lg text-zinc-400 ">COST:</span>
                <span className="font-bold text-lg text-zinc-400 ">
                  {preco}K
                </span>
              </>
            )}
          </div>

          {productsOnStore[index]?.bought === false && (
            <button
              className="mt-2 border border-slate-300 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms] hover:bg-zinc-700 hover:text-white hover:border-zinc-700"
              onClick={() => {
                setBuy(index);
              }}
            >
              BUY
            </button>
          )}

          {productsOnStore[index]?.bought === true && (
            <button className="mt-2 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms]">
              OBTAINED✔️
            </button>
          )}
          {productsOnStore[index]?.bought === true && (
            <button
              className={`text-white mt-2 border border-slate-300 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms] ${
                skinCoinActual === index
                  ? "bg-zinc-700 text-white/90"
                  : "hover:bg-zinc-700 hover:text-white hover:border-zinc-700"
              }`}
              onClick={() => {
                setSkinCoin(index);
              }}
            >
              {skinCoinActual === index ? "IN USE" : "USE"}
            </button>
          )}

          <div className="w-full flex justify-center mt-2">
            {erro !== null && erro.index === index && (
              <span className="font-bold text-sm text-zinc-400  cursor-pointer transition-colors hover:text-zinc-500">
                {erro.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export const ProductAvatar = ({ children, scale, name, preco, index }) => {
  const {
    gameStage,
    setGameStage,
    setBuy2,
    productsOnStore2,
    erro,
    setSkinAvatar,
    skinAvatarActual,
  } = useStoreApp();

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
            {productsOnStore2[index]?.bought === false && (
              <>
                <span className="font-bold text-lg text-zinc-400 ">COST:</span>
                <span className="font-bold text-lg text-zinc-400 ">
                  {preco}K
                </span>
              </>
            )}
          </div>

          {productsOnStore2[index]?.bought === false && (
            <button
              className="mt-2 border border-slate-300 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms] hover:bg-zinc-700 hover:text-white hover:border-zinc-700"
              onClick={() => {
                setBuy2(index);
              }}
            >
              BUY
            </button>
          )}

          {productsOnStore2[index]?.bought === true && (
            <button className="mt-2 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms]">
              OBTAINED✔️
            </button>
          )}
          {productsOnStore2[index]?.bought === true && (
            <button
              className={`text-white mt-2 border border-slate-300 w-[60%] rounded-sm py-2 font-bold text-lg text-zinc-400 tracking-wide duration-[1000ms] ${
                skinAvatarActual === index
                  ? "bg-zinc-700 text-white/90"
                  : "hover:bg-zinc-700 hover:text-white hover:border-zinc-700"
              }`}
              onClick={() => {
                setSkinAvatar(index);
              }}
            >
              {skinAvatarActual === index ? "IN USE" : "USE"}
            </button>
          )}

          <div className="w-full flex justify-center mt-2">
            {erro !== null && erro.index === index && (
              <span className="font-bold text-sm text-zinc-400  cursor-pointer transition-colors hover:text-zinc-500">
                {erro.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
