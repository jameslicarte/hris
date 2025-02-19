'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, notification } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Nullable } from '@/schemas/types'
import { NotificationContext } from '@/lib/context'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathName = usePathname()

  const [showNotification, notify] = useState<
    Nullable<{
      message: string
      title: string
    }>
  >(null)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = useCallback(
    ({
      type = 'success',
      title,
      message,
    }: {
      type?: NotificationType
      title: string
      message: string
    }) => {
      api[type]({
        message: title,
        description: message,
        // key: title.trim(),
      })
    },
    [api]
  )

  useEffect(() => {
    if (showNotification) {
      openNotification({
        title: showNotification.title,
        message: showNotification.message,
      })
      notify(null)
    }
  }, [openNotification, showNotification])

  const getBreadCrumbItems = () => {
    const path = pathName.split('/').filter((item) => item !== '')
    return path.map((item) => {
      // Capitalize first letter
      const itemWithCapitalizedFirstLetter =
        item.charAt(0).toUpperCase() + item.slice(1)
      const isLastItem = path[path.length - 1] === item

      if (isLastItem) {
        return {
          title: itemWithCapitalizedFirstLetter,
        }
      }

      return {
        title: <Link href={`/${item}`}>{itemWithCapitalizedFirstLetter}</Link>,
      }
    })
  }

  const siderItems: MenuProps['items'] = [
    {
      key: 'home',
      label: 'Home',
      icon: <CalendarOutlined />,
      onClick: () => {
        router.push('/home')
      },
    },
    {
      key: 'manage',
      label: 'Manage',
      icon: <UserOutlined />,
      onClick: () => {
        router.push('/manage')
      },
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: <BarChartOutlined />,
      onClick: () => {
        router.push('/reports')
      },
    },
  ]

  return (
    <NotificationContext.Provider
      value={{
        notify,
      }}
    >
      {contextHolder}
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={[
              {
                key: 'logo',
                label: '<Logo>',
              },
            ]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout>
          <Sider
            theme={'light'}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={siderItems}
            />
          </Sider>

          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb
              items={getBreadCrumbItems()}
              style={{ margin: '16px 0' }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </NotificationContext.Provider>
  )
}
