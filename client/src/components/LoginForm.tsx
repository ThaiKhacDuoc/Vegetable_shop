"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import { Button, SelectItem, select } from "@nextui-org/react";
import { Select, Input } from "@nextui-org/react";
// import { getCookie, hasCookie } from "cookies-next";

interface Type {
  titleInput1: string;
  titleInput2: string;
  handleFunction: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => void;
}

export default function LoginForm({
  titleInput1,
  titleInput2,
  handleFunction,
}: Type) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const handleLoginFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFunction(e, username, password);
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
      <form onSubmit={handleLoginFunction}>
        <Input
          isRequired
          type="text"
          label={titleInput1}
          value={username}
          className="mb-5 h-12 mr-32"
          onChange={(e) => {
            const value = handleInputChange(e);
            setUsername(value);
          }}
        />

        <Input
          isRequired
          type="password"
          label={titleInput2}
          value={password}
          className="mb-5 h-12 mr-32"
          onChange={(e) => {
            const value = handleInputChange(e);
            setPassword(value);
          }}
        />
        <div className="flex justify-around">
          <Button
            color="danger"
            variant="flat"
            onClick={() => router.push(`/login`)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </>
  );
}
