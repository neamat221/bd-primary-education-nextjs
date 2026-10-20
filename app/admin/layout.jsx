import AdminShell from "../../components/AdminShell";
import { AdminProvider } from "../../components/AdminProvider";

export const metadata = {
  title: "Admin | ShikkhaBondhu",
  description: "Manage students, teachers, classes, and notices.",
};

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
