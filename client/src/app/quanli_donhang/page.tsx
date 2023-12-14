"use client";
import React, { useEffect, useState } from "react";
import NavigaComponent from "@/components/NavigaComponent";
import {
  Tabs,
  Tab,
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CardBody,
} from "@nextui-org/react";
import http from "../utils/http";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";
import { Nhanvien } from "../types/nhanvien.type";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

interface Donhang {
  DonHangID: string;
  KhachHangID: string;
  NgayMua: string;
  NhanVienID: number;
  SoLuong: string;
  TenKhachHang: string;
  TongTien: string;
}

export default function Quanlydonhang() {
  const [Donhangs, setDonhang] = useState<Donhang[]>([]);
  const donhangList = Array.isArray(Donhangs) ? Donhangs : [];
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          `donhang_index`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        );

        if (response.status === 200) {
          setDonhang(response.data.donhangs);
          console.log(response.data.donhangs);
        } else {
          console.log("Loi he thong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await http.get(`donhang_index`);
      if (response.status === 200) {
        setDonhang(response.data.donhangs);
        console.log(response.data.donhangs);
      } else {
        console.log("Loi he thong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavigaComponent />
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" className="mt-5">
          <Tab key="Đơn hàng" title="Đơn hàng">
            <Card>
              <CardBody>
                <div className="flex flex-row items-center justify-between mb-4">
                  <h5 className="font-bold text-xl">
                    Danh sách đơn hàng trong hệ thống
                  </h5>
                </div>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>ID Đơn hàng</TableColumn>
                    <TableColumn>ID Khách hàng</TableColumn>
                    <TableColumn>ID Nhân viên</TableColumn>
                    <TableColumn>Ngày mua</TableColumn>
                    <TableColumn>Số lượng</TableColumn>
                    <TableColumn>Tên khách hàng</TableColumn>
                    <TableColumn>Tổng tiền</TableColumn>
                    <TableColumn>Chức năng</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {donhangList?.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{value.DonHangID}</TableCell>
                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.KhachHangID}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.NhanVienID}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.NgayMua}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.SoLuong}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.TenKhachHang}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.TongTien}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-row items-center justify-start space-x-4">
                              <Button isIconOnly color="primary">
                                <TbListDetails
                                  size={20}
                                  onClick={() =>
                                    router.push(
                                      `/view_donhang?id=${value.DonHangID}`
                                    )
                                  }
                                />
                              </Button>
                              <Button
                                isIconOnly
                                color="danger"
                                onClick={() => {
                                  const headers: Headers = new Headers();
                                  headers.append("Accept", "application/json");
                                  headers.append(
                                    "Content-Type",
                                    "application/json"
                                  );
                                  // headers.append(
                                  //   "Authorization",
                                  //   getCookie("token") as string
                                  // );
                                  fetch(
                                    `${process.env.BACKEND_URL}donhang_delete/${value.DonHangID}`,
                                    {
                                      method: "DELETE",
                                      headers: headers,
                                    }
                                  )
                                    .then((r) => r.json())
                                    .then((d) => {
                                      if (d.status === "success") {
                                        alert("Xóa thành công");
                                        fetchOrders();
                                      } else alert("Xóa thất bại");
                                    });
                                }}
                              >
                                <RiDeleteBin5Line size={20} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
