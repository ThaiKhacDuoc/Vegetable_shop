'use client'
import React, { useEffect, useState } from 'react'
import NavigaComponent from '@/components/NavigaComponent'
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
  Button
} from '@nextui-org/react'
import http from '../utils/http'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Nhanvien } from '../types/nhanvien.type'

interface User {
  Note: string
  Password: string
  Role: string
  UserID: number
  Username: string
}

export default function Quanlydanhsach() {
  const [Users, setUsers] = useState<User[]>([])
  const userList = Array.isArray(Users) ? Users : []
  const [Nhanviens, setNhanvien] = useState<Nhanvien[]>([])
  const nhanvienList = Array.isArray(Nhanviens) ? Nhanviens : []

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          `user_index`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        )

        if (response.status === 200) {
          setUsers(response.data.users)
          console.log(response.data.users)
        } else {
          console.log('Loi he thong')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchD() {
      try {
        const response = await http.get(
          `nhanvien_index`
          // {
          //   headers: {
          //     Authorization: `${token}`,
          //   },
          // }
        )

        if (response.status === 200) {
          setNhanvien(response.data.nhanviens)
          console.log(response.data.nhanviens)
        } else {
          console.log('Loi he thong')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchD()
  }, [])

  return (
    <>
      <NavigaComponent />
      <div className='flex w-full flex-col'>
        <Tabs aria-label='Options'>
          <Tab key='Nhân viên' title='Nhân viên'>
            <Card className='mt-10'>
              <Table aria-label='Example static collection table'>
                <TableHeader>
                  <TableColumn>NhanvienID</TableColumn>
                  <TableColumn>Họ Tên</TableColumn>
                  <TableColumn>Ngày Sinh</TableColumn>
                  <TableColumn>Địa chỉ</TableColumn>
                  <TableColumn>Ghi Chú</TableColumn>
                  <TableColumn>Phone</TableColumn>
                  <TableColumn>Chức năng</TableColumn>
                </TableHeader>
                <TableBody>
                  {nhanvienList?.map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.NhanVienID}</TableCell>
                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.HoTen}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.NgaySinh}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.DiaChi}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.GhiChu}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.Phone}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-row items-center justify-start space-x-4'>
                            <Button isIconOnly color='danger' onClick={() => {}}>
                              <RiDeleteBin5Line size={20} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </Tab>
          <Tab key='User' title='User'>
            <Card>
              <Table aria-label='Example static collection table'>
                <TableHeader>
                  <TableColumn>UserID</TableColumn>
                  <TableColumn>Username</TableColumn>
                  <TableColumn>Role</TableColumn>
                  <TableColumn>Note</TableColumn>
                  <TableColumn>Chức năng</TableColumn>
                </TableHeader>
                <TableBody>
                  {userList?.map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.UserID}</TableCell>
                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.Username}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.Role}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-col items-start justify-start'>
                            <span className='font-semibold'>{value.Note}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex flex-row items-center justify-start space-x-4'>
                            <Button isIconOnly color='danger' onClick={() => {}}>
                              <RiDeleteBin5Line size={20} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
