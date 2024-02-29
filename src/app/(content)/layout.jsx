"use client";
import Header from '../../Layout/header';
import Footer from '../../Layout/footer';
import "@/styles/global.css";
import { useSelector } from "react-redux";
import { selectUserId, selectRole } from "@/Context/features/auth/authSlice";

export default function Layout({ children }) {
    const userId = useSelector(selectUserId);
    const role = useSelector(selectRole);
    console.log(role);
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