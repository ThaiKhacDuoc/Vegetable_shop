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
import { useRouter, useSearchParams } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

interface Danhmuc {
  GiaBan: string;
  TenSanPham: string;
  ThongTinSanPham: string;
  SanPhamID: string;
}

export default function Quanlydanhmuc() {
  const [danhmucs, setDanhmuc] = useState<Danhmuc[]>([]);
  const danhmucList = Array.isArray(danhmucs) ? danhmucs : [];
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          `danhmuc_find/${params.get("id")}`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        );

        if (response.status === 200) {
          setDanhmuc(response.data.sanphams);
          console.log(response.data.sanphams);
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
      const response = await http.get(`danhmuc_find/${params.get("id")}`);
      if (response.status === 200) {
        setDanhmuc(response.data.sanphams);
        console.log(response.data.sanphams);
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
          <Tab key="Danh mục" title="Danh mục">
            <Card>
              <CardBody>
                <div className="flex flex-row items-center justify-between mb-4">
                  <h5 className="font-bold text-xl">
                    Danh sách thực phẩm trong hệ thống
                  </h5>

                  <div className="flex flex-row items-center justify-end space-x-4 px-4">
                    <Button
                      isIconOnly
                      color="success"
                      onClick={() => router.push("/add_sanpham")}
                      className="mb-2"
                    >
                      <BiPlus size={25} />
                    </Button>
                  </div>
                </div>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>ID Sản phẩm</TableColumn>
                    <TableColumn>Tên sản phẩm</TableColumn>
                    <TableColumn>Giá bán</TableColumn>
                    <TableColumn>Thông tin sản phẩm</TableColumn>
                    <TableColumn>Chức năng</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {danhmucList?.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{value.SanPhamID}</TableCell>
                          <TableCell>{value.TenSanPham}</TableCell>
                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.GiaBan}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start justify-start">
                              <span className="font-semibold">
                                {value.ThongTinSanPham}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-row items-center justify-start space-x-4">
                              <Button isIconOnly color="primary">
                                <RiEditBoxLine
                                  size={20}
                                  onClick={() => {router.push(`/update_sanpham?id=${value.SanPhamID}`)}}
                                />
                              </Button>
                              <Button
                                isIconOnly
                                color="danger"
                                onClick={() => {
                                  
                                  const headers: Headers = new Headers();
                                  headers.append(
                                    "Accept",
                                    "application/json"
                                  );
                                  headers.append(
                                    "Content-Type",
                                    "application/json"
                                  );
                                  // headers.append(
                                  //   "Authorization",
                                  //   getCookie("token") as string
                                  // );
                                  fetch(
                                    `${process.env.BACKEND_URL}sanpham_delete/${value.SanPhamID}`,
                                    {
                                      method: "DELETE",
                                      headers: headers,
                                    
                                    }
                                  )
                                    .then((r) => r.json())
                                    .then((d) => {
                                      if (d.status === 200) {
                                        alert("Xóa thành công")
                                        fetchOrders()

                                      } else 
                                      alert("Xóa thất bại")
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
