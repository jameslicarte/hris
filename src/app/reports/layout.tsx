import DashboardLayout from '../component/Layout/DashboardLayout'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
