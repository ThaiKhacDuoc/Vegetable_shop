"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import http from "@/app/utils/http";
import { Infodonhang } from "@/app/types/info.type";
import { Item } from "@/app/types/item.type";

interface BillComponentProps {
  billItems: Item[];
}

export default function BillComponent({ billItems }: BillComponentProps) {
  const [sanPhamIDs, setSanPhamIDs] = useState<string[]>([]);
  const [soluong, setSoluong] = useState<number>(0);
  const [ten, setTen] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [phone, setPhone] = useState("");
  const [diachi, setDiachi] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [ngaymua, setNgaymua] = useState("");
  const [idnhanvien, setIdNhanvien] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const handleAdd = async () => {
    if (ten != "" && ngaysinh != "" && phone != "" && diachi != "" && ghichu != "" && ngaymua != "" && idnhanvien != "") {
      const data = {
        hoten : ten,
        ngaysinh,
        phone,
        diachi,
        ghichu,
        ngaymua,
        nhanVienID: idnhanvien,
        soLuong: soluong,
        sanPhamIDs
      };
      try {
        const response = await http.post("bill_add", data);
        const result = await response.data;
        console.log(result);
        if (result.status == 200) {
          alert("Tạo bill thành công")
          // dispatch(successPopUp(result.data.message));
        } else if (result.status != 200) {
          // dispatch(failPopUp(result.data.message));
          alert("Tạo bill thất bại")

        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Xin mời nhập input")
    }
  };

  useEffect(() => {
    const newSanPhamIDs = billItems.map((sanpham) => sanpham.SanPhamID);
    setSanPhamIDs(newSanPhamIDs);
    setSoluong(billItems.length);
  }, [billItems]);

  return (
    <div className="pl-52 rounded-lg drop-shadow-2xl w-1/2 mr-5">
      <Card className="max-w-[340px]">
        <div className="flex flex-col justify-center items-center gap-1 font-bold h-[desiredHeight] text-lg mb-2.5 mt-2.5">
          <h2>Hóa đơn thanh toán</h2>
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <div className="flex w-full flex-wrap items-end md:flex-nowrap  gap-4 pb-2">
                  <Input
                    key="outside"
                    type="text"
                    label="Ten"
                    value={ten}
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setTen(value);
                    }}
                  />
                  <Input
                    key="outside"
                    type="text"
                    value={ngaysinh}
                    label="Ngay sinh"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setNgaysinh(value);
                    }}
                  />
                </div>
                <div className="flex w-full flex-wrap items-end md:flex-nowrap  gap-4 pb-2">
                  <Input
                    key="outside"
                    type="text"
                    value={phone}
                    label="Phone"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setPhone(value);
                    }}
                  />
                  <Input
                    key="outside"
                    type="text"
                    value={diachi}
                    label="Địa chỉ"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setDiachi(value);
                    }}
                  />
                </div>
                <div className="flex w-full flex-wrap items-end md:flex-nowrap  gap-4 pb-2">
                  <Input
                    key="outside"
                    type="text"
                    value={ghichu}
                    label="Ghi chú"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setGhichu(value);
                    }}
                  />
                  <Input
                    key="outside"
                    type="text"
                    value={ngaymua}
                    label="Ngày mua"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const value = handleInputChange(e);
                      setNgaymua(value);
                    }}
                  />
                </div>

                <Input
                  key="outside"
                  type="text"
                  value={idnhanvien}
                  label="ID Nhân viên"
                  labelPlacement="outside"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setIdNhanvien(value);
                  }}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            {billItems?.map((sanpham, index) => (
              <div
                key={index + 1}
                className="flex flex-col gap-1 items-start justify-center"
              >
                -------------------------------------------------
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {index + 1}. Tên sản phẩm: {sanpham.TenSanPham}
                </h4>
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Giá bán: {sanpham.GiaBan} VNĐ
                </h4>
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Danh mục: {sanpham.TenDanhMuc}
                </h4>
              </div>
            ))}
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className=" text-default-400 text-small">Số lượng: </p>
              <p className="font-semibold text-default-400 text-small">
                {billItems.length}
              </p>
            </div>
            <div className="flex gap-1 pl-32">
              <Button color="primary" onClick={() => handleAdd()}>
                Add
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
