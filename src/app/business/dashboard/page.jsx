import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import Dashboard from "@/components/business/Dashboard";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}