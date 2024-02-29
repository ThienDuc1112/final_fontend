
import "@/styles/global.css";
export default function Layout({ children }) {
  return (
    <div>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}
