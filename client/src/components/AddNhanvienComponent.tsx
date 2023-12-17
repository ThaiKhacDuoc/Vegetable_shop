"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, SelectItem, select } from "@nextui-org/react";
import { Select, Input } from "@nextui-org/react";

interface Type {
  titleInput1: string;
  titleInput2: string;
  titleInput3: string;
  titleInput4: string;
  titleInput5: string;
  titleInput6: string;
  titleInput7: string;
  titleInput8: string;
  push: string;
  titilebutton: string;
  handleFunction: (input1: string, input2: string, input3: string, input4: string, input5: string, input6: string, input7: string, input8: string ) => Promise<void>;
}

export default function AddNhanvienComponent({
  titleInput1,
  titleInput2,
  titleInput3,
  titleInput4,
  titleInput5,
  titleInput6,
  titleInput7,
  titleInput8,
  titilebutton,
  push,
  handleFunction,
}: Type) {
  const router = useRouter();

  const [hoten, setHoten] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [phone, setPhone] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ghichu, setGhichu] = useState("");
  const params = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const handleAddFunction = async () => {
    // Sử dụng hàm được truyền từ prop
    await handleFunction(hoten, ngaysinh, phone,diachi,gmail,username,password,ghichu);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1 font-bold h-[desiredHeight] text-lg mb-2.5 mt-2.5"></div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-1 items-start justify-center">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap gap-4 pb-2">
            <div className="flex flex-wrap">
              <div className="flex mb-5 gap-5">
                <Input
                  isRequired
                  type="text"
                  label={titleInput1}
                  value={hoten}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setHoten(value);
                  }}
                />

                <Input
                  isRequired
                  type="text"
                  label={titleInput2}
                  value={ngaysinh}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setNgaysinh(value);
                  }}
                />
              </div>
              <div className="flex mb-5 gap-5">
                <Input
                  isRequired
                  type="text"
                  label={titleInput3}
                  value={phone}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setPhone(value);
                  }}
                />

                <Input
                  isRequired
                  type="text"
                  label={titleInput4}
                  value={diachi}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setDiachi(value);
                  }}
                />
              </div>
              <div className="flex mb-5 gap-5">
                <Input
                  isRequired
                  type="text"
                  label={titleInput5}
                  value={gmail}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setGmail(value);
                  }}
                />

                <Input
                  isRequired
                  type="text"
                  label={titleInput6}
                  value={username}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setUsername(value);
                  }}
                />
              </div>
              <div className="flex mb-5 gap-5">
                <Input
                  isRequired
                  type="password"
                  label={titleInput7}
                  value={password}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setPassword(value);
                  }}
                />

                <Input
                  isRequired
                  type="text"
                  label={titleInput8}
                  value={ghichu}
                  className="h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setGhichu(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <Button
          color="danger"
          variant="flat"
          onClick={() => router.push(`${push}`)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleAddFunction();
            router.push(`${push}`);
          }}
        >
          {titilebutton}
        </Button>
      </div>
    </>
  );
}
