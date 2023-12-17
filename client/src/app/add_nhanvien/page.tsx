"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import http from "@/app/utils/http";
// import { getCookie } from "cookies-next";
import { MdOutlineDevicesOther } from "react-icons/md";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import FormComponent from "@/components/FormComponent";
import AddNhanvienComponent from "@/components/AddNhanvienComponent";

interface OptionType {
  value: string;
  label: string;
}

type SelectChangeValueType = OptionType | null;

export default function AddNhanvien() {
  const handleAdd = async (
    input1: string,
    input2: string,
    input3: string,
    input4: string,
    input5: string,
    input6: string,
    input7: string,
    input8: string
  ) => {
    if (input1 != "" && input2 != "") {
      const data = {
        hoten: input1,
        ngaysinh: input2,
        phone: input3,
        diachi: input4,
        gmail: input5,
        username: input6,
        password: input7,
        ghichu: input8,
      };
      try {
        const response = await http.post("nhanvien_add", data, {
          // headers: {
          //   Authorization: `${getCookie("token")?.toString()}`,
          // },
        });
        const result = await response.data;
        console.log(result);
        if (result.status == "success") {
          alert("Thêm thành công");
        } else if (result.status != 200) {
          alert("Thêm thất bại");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // dispatch(failPopUp("E001"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg drop-shadow-2xl w-1/3">
        <div className="flex flex-col justify-center items-center gap-1 font-bold h-[desiredHeight] text-lg mb-2.5">
          <MdOutlineDevicesOther className="text-2xl" />
          Thêm nhân viên
          <Tabs
            key="primary"
            color="primary"
            aria-label="Tabs colors"
            radius="full"
          >
            <Tab key="nhanvien" title="Nhân viên">
              <AddNhanvienComponent
                titleInput1="Tên"
                titleInput2="Ngày sinh"
                titleInput3="Phone"
                titleInput4="Địa chỉ"
                titleInput5="Gmail"
                titleInput6="Username"
                titleInput7="Password"
                titleInput8="Ghi chú"
                push="/quanli_danhsach"
                titilebutton = "Add"
                handleFunction={handleAdd}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
