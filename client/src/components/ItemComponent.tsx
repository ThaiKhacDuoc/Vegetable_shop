import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import http from "@/app/utils/http";
import { IoAddOutline } from "react-icons/io5";
import { Item } from "@/app/types/item.type";



interface ItemComponentProps {
  onAddToBill: (item: Item) => void;
}

export default function ItemComponent({ onAddToBill }: ItemComponentProps) {
  const [items, setItem] = useState<Item[]>([]);
  const itemList = Array.isArray(items) ? items : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          `sanpham_index`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        );

        if (response.status === 200) {
          setItem(response.data.sanphams);
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

  return (
    <div className="pl-4">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {itemList?.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.SanPhamID}
                className="w-full object-cover h-[140px]"
                src={`${process.env.BACKEND_URL}${item.HinhAnh}`}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.TenSanPham}</b>
              <p className="text-default-500">{item.GiaBan} VNĐ</p>
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                className="text-sm"
                onClick={() => onAddToBill(item)}
              >
                <IoAddOutline />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
