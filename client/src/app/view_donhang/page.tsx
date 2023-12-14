"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import http from "../utils/http";
import { useSearchParams } from "next/navigation";
import { Infodonhang } from "../types/info.type";

export default function App() {
  const params = useSearchParams();
  const [iddonhang, setIddonhang] = useState("");
  const [idkhachhang, setIdkhachhang] = useState("");
  const [ngaymua, setNgaymua] = useState("");
  const [idnhanvien, setIdnhanvien] = useState("");
  const [tongtien, setTongtien] = useState("");
  const [soluong, setSoluong] = useState("");
  const [sanphams, setSanphams] = useState<Infodonhang[]>([]);
  const sanphamList = Array.isArray(sanphams) ? sanphams : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          `bill_view/${params.get("id")}`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        );

        if (response.status === 200) {
          setIddonhang(response.data.donhang_info.DonHangID);
          setIdkhachhang(response.data.donhang_info.KhachHangID);
          setNgaymua(response.data.donhang_info.NgayMua);
          setIdnhanvien(response.data.donhang_info.NhanVienID);
          setSanphams(response.data.donhang_info.SanPham);
          setSoluong(response.data.donhang_info.SoLuong);
          setTongtien(response.data.donhang_info.TongTien);
          console.log(response.data.donhang_info.SanPham);
        } else {
          console.log("Loi he thong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg drop-shadow-2xl w-1/3">
        <Card className="max-w-[340px]">
          <div className="flex flex-col justify-center items-center gap-1 font-bold h-[desiredHeight] text-lg mb-2.5 mt-2.5">
            <h2>Hóa đơn thanh toán</h2>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    ID Đơn hàng: {iddonhang}
                  </h4>
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    ID Khách hàng: {idkhachhang}
                  </h4>
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    ID Nhân viên: {idnhanvien}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    @{ngaymua}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              {sanphamList?.map((sanpham, index) => (
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
                  {soluong}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-default-400 text-small">Tổng tiền: </p>
                <p className="font-semibold text-default-400 text-small">
                  {tongtien} VNĐ
                </p>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}
