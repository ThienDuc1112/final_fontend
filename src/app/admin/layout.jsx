import "@/styles/global.css";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export default function Layout({ children }) {
  return (
    <div>
      <main>
        <DefaultLayout>
          <div>{children}</div>
        </DefaultLayout>
      </main>
    </div>
  );
}
