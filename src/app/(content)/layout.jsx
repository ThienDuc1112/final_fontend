import Header from '../../Layout/header';
import "@/styles/global.css"

export default function Layout({ children }) {
    return (
        <div>
            <main>
                <Header />
                <div>{children}</div>
            </main>
        </div>
    )
}