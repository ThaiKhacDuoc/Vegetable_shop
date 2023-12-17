"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, SelectItem, select } from "@nextui-org/react";
import { Select, Input } from "@nextui-org/react";
// import { getCookie, hasCookie } from "cookies-next";

interface Type {
  titleInput1: string;
  titleInput2: string;
  handleFunction: (input1: string, input2: string) => Promise<void>
}

export default function FormComponent( {titleInput1, titleInput2, handleFunction} : Type) {
  const router = useRouter();

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const handleAddFunction = async () => {
    // Sử dụng hàm được truyền từ prop
    await handleFunction(input1, input2);
  };

  // const handleButtonDevice = async () => {
  //   if (selectedValue && name != "" && pin != "") {
  //     const data = {
  //       device: selectedValue,
  //       name,
  //       pin,
  //       home_id: params.get("id"),
  //     };
  //     try {
  //       const response = await http.post("api/ir/create", data, {
  //         // headers: {
  //         //   Authorization: `${getCookie("token")?.toString()}`,
  //         // },
  //       });
  //       const result = await response.data;
  //       console.log(result);
  //       if (result.code == 200) {
  //         console.log(result.data.data.message);
  //         // dispatch(successPopUp(result.data.message));
  //       } else if (result.code != 200) {
  //         // dispatch(failPopUp(result.data.message));
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   } else {
  //     // dispatch(failPopUp("E001"));
  //   }
  // };

  return (
    <>
      <Input
        isRequired
        type="text"
        label={titleInput1}
        value={input1}
        className="mb-5 h-12 mr-32"
        onChange={(e) => {
          const value = handleInputChange(e);
          setInput1(value);
        }}
      />

      <Input
        isRequired
        type="text"
        label={titleInput2}
        value={input2}
        className="mb-5 h-12 mr-32"
        onChange={(e) => {
          const value = handleInputChange(e);
          setInput2(value);
        }}
      />
      <div className="flex justify-around">
        <Button
          color="danger"
          variant="flat"
          onClick={() =>
            router.push(`/quanli_danhmuc`)
          }
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleAddFunction();
            router.push(`/quanli_danhmuc`);
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}
