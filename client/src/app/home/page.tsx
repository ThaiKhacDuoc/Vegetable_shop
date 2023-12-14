"use client";
import React, { useState } from "react";
import NavigaComponent from "@/components/NavigaComponent";
import { Card, CardHeader, CardFooter, Button, Image } from "@nextui-org/react";
// import Image from "next/image";
import anh1 from "@/app/images/anh1.jpg";
import anh2 from "@/app/images/anh2.jpg";
import anh3 from "@/app/images/anh3.jpg";
import anh4 from "@/app/images/anh4.jpg";
import anh5 from "@/app/images/anh5.jpg";
import ItemComponent from "@/components/ItemComponent";
import BillComponent from "@/components/BillComponent";
import { Item } from "../types/item.type";

export default function Homepage() {
  const [billItems, setBillItems] = useState<Item[]>([]);

  const addToBill = (item: Item) => {
    setBillItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <div className="fixed w-full z-40 mb-10">
        <NavigaComponent />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-10">
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                What to watch
              </p>
              <h4 className="text-white font-medium text-large">Vegetable</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={anh1.src}
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Plant a tree
              </p>
              <h4 className="text-white font-medium text-large">
                Banana-Lemon
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={anh2.src}
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Supercharged
              </p>
              <h4 className="text-white font-medium text-large">Chili</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={anh3.src}
            />
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-black font-medium text-2xl">Shop</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={anh4.src}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Bean.</p>
                <p className="text-black text-tiny">Fruit.</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                Notify Me
              </Button>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Your day your way
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                Your checklist Vegetable
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={anh5.src}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src="/images/breathing-app-icon.jpeg"
                />
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Breathing App</p>
                  <p className="text-tiny text-white/60">
                    Get a good night's sleep.
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Get App
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex">
        <ItemComponent onAddToBill={addToBill}/>
        <BillComponent billItems={billItems}/>
      </div>
    </>
  );
}
