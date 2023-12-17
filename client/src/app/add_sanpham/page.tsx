"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import http from "@/app/utils/http";
// import { getCookie } from "cookies-next";
import { MdOutlineDevicesOther } from "react-icons/md";
import { Tabs, Tab} from "@nextui-org/react";
import AddSanphamComponent from "@/components/AddSanphamComponent";

interface OptionType {
  value: string;
  label: string;
}

type SelectChangeValueType = OptionType | null;

export default function AddHome() {
  const [selectedOption, setSelectedOption] =
    useState<SelectChangeValueType | null>(null);
  const router = useRouter();

  const handleAdd = async (
    input1: string,
    input2: string,
    input3: string,
    input4: string,
    image: File | null
  ) => {
    const formData = new FormData();
    formData.append("tensanpham", input1);
    formData.append("thongtinsanpham", input2);
    formData.append("giaban", input3);
    formData.append("tendanhmuc", input4);
    if (image) {
      formData.append("image_path", image);
    }

    const response = await fetch(`${process.env.BACKEND_URL}sanpham_add`, {
      method: "POST",
      // headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const result = await response.json();
    console.log(result);
    if (result.status == "200") {
      alert("Thêm thành công");
    } else if (result.status != 200) {
      alert("Thêm thất bại");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg drop-shadow-2xl w-1/3">
        <div className="flex flex-col justify-center items-center gap-1 font-bold h-[desiredHeight] text-lg mb-2.5">
          <MdOutlineDevicesOther className="text-2xl" />
          Thêm sản phẩm
          <Tabs
            key="primary"
            color="primary"
            aria-label="Tabs colors"
            radius="full"
          >
            <Tab key="sanpham" title="Sản phẩm">
              <AddSanphamComponent
                titleInput1="Tên sản phẩm"
                titleInput2="Thông tin sản phẩm"
                titleInput3="Giá bán"
                titleInput4="Tên danh mục"
                handleFunction={handleAdd}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
