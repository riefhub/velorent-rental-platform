import SidebarAdmin from '@/components/SidebarAdmin';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
