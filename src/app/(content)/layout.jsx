import Header from '../../Layout/header';
import Footer from '../../Layout/footer';
import "@/styles/global.css"

export default function Layout({ children }) {
    return (
        <div>
            <main>
                <Header />
                <div>{children}</div>
                <Footer />
            </main>
        </div>
    )
}