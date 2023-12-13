'use client'
import React from 'react'
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
  DropdownItem
} from '@nextui-org/react'
import AcmeLogo from '../app/Icon/AcmeLogo'
import ModelComponent from '@/components/ModelComponent'
import SearchIcon from '../app/Icon/SearchIcon'
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from '../app/Icon/Icons'
import { useRouter } from 'next/navigation'

export default function NavigaComponent() {
  const icons = {
    chevron: <ChevronDown fill='currentColor' size={16} />,
    scale: <Scale className='text-warning' fill='currentColor' size={30} />,
    lock: <Lock className='text-success' fill='currentColor' size={30} />,
    activity: <Activity className='text-secondary' fill='currentColor' size={30} />,
    flash: <Flash className='text-primary' fill='currentColor' size={30} />,
    server: <Server className='text-success' fill='currentColor' size={30} />,
    user: <TagUser className='text-danger' fill='currentColor' size={30} />
  }

  const router = useRouter()

  return (
    <>
      <Navbar className='bg-white shadow-lg text-black'>
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit cursor-pointer' onClick={() => router.push(`/home`)}>
            Vegetable Shop
          </p>
        </NavbarBrand>
        <NavbarContent justify='start'>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                  endContent={icons.chevron}
                  radius='sm'
                  variant='light'
                >
                  Chi tiết
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='ACME features'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4'
              }}
            >
              <DropdownItem
                key='autoscaling'
                description='Hiển thị danh sách, thêm, sửa, xóa,...'
                startContent={icons.scale}
                onClick={() => router.push(`/quanli_danhsach`)}
              >
                Quản lý danh sách
              </DropdownItem>
              <DropdownItem
                key='usage_metrics'
                description='Hiển thị danh sách, thêm, sửa, xóa,...'
                startContent={icons.activity}
                onClick={() => router.push(`/quanli_danhmuc`)}
              >
                Quản lý theo danh mục
              </DropdownItem>
              <DropdownItem
                key='production_ready'
                description='Hiển thị danh sách, thêm, sửa, xóa,...'
                startContent={icons.flash}
              >
                Quản lý đơn hàng
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input
            classNames={{
              base: 'max-w-full sm:max-w-[10rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchIcon size={18} />}
            type='search'
          />
          <NavbarItem>
            <ModelComponent />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
