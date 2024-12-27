'use client'
import React, { useState } from 'react'
import {
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

const items1: MenuProps['items'] = [
  {
    key: 'logo',
    label: '<Logo>',
  },
]

const items2: MenuProps['items'] = [
  {
    key: 'home',
    label: 'Home',
    icon: <CalendarOutlined />,
  },
  {
    key: 'manage',
    label: 'Manage',
    icon: <UserOutlined />,
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: <BarChartOutlined />,
  },
]

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
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
            items={items2}
          />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
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
  )
}
