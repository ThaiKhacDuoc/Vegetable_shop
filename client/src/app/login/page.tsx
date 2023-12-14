"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import http from "@/app/utils/http";
// import { getCookie } from "cookies-next";
import { MdOutlineDevicesOther } from "react-icons/md";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { SlLogin } from "react-icons/sl";
import LoginForm from "@/components/LoginForm";
import { hasCookie, setCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();



  const handleLogin = (e: FormEvent<HTMLFormElement>, username : string, password : string ) => {
    e.preventDefault();
    // dispatch(setLoading());

    const headers: Headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    fetch(process.env.BACKEND_URL + "api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.status == 200) {
          // dispatch(successPopUp(d.message));
          setCookie("token", d.token, { maxAge: 60 * 60 * 24 * 7 });
          router.push("/home");
          
        } else {
          router.push("/login");
          // dispatch(failPopUp(d.message));
          // dispatch(resetLoading());
        }
      });
  };
 
  const handleAdd = async (input1: string, input2: string) => {
    if (input1 != "" && input2 != "") {
      const data = {
        tendanhmuc :input1,
        mota :input2,
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
          alert("Thêm thành công")
        } else if (result.status != 200) {
          alert("Thêm thất bại")

        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // dispatch(failPopUp("E001"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
          <SlLogin className="text-4xl text-blue-500" />
          Login
          <Tabs key="primary" color="primary" aria-label="Tabs colors" radius="full">
            <Tab key="login" title="Login">
              <LoginForm titleInput1="Username" titleInput2="Password" handleFunction={handleLogin} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
