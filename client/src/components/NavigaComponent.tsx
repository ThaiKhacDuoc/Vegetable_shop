"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import AcmeLogo from "../app/Icon/AcmeLogo";
import ModelComponent from "@/components/ModelComponent";
import SearchIcon from "../app/Icon/SearchIcon";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "../app/Icon/Icons";
import { useRouter } from "next/navigation";

export default function NavigaComponent() {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const router = useRouter();

  return (
    <>
      <Navbar className="bg-white shadow-lg text-black">
        <NavbarBrand>
          <AcmeLogo />
          <p
            className="font-bold text-inherit cursor-pointer"
            onClick={() => router.push(`/home`)}
          >
            Vegetable Shop
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/home" aria-current="page" color="secondary">
              Trang Chủ
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Chi tiết
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="Hiển thị danh sách, thêm, sửa, xóa,..."
                startContent={icons.scale}
                onClick={() => router.push(`/quanli_danhsach`)}
              >
                Quản lý danh sách
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Hiển thị danh sách, thêm, sửa, xóa,..."
                startContent={icons.activity}
                onClick={() => router.push(`/quanli_danhmuc`)}
              >
                Quản lý theo danh mục
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="Hiển thị danh sách, thêm, sửa, xóa,..."
                startContent={icons.flash}
              >
                Quản lý đơn hàng
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
