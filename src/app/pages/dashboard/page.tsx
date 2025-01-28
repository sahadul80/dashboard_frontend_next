"use client"
import { Toaster } from "react-hot-toast";
import Session from "../../components/session";

export default async function Dashboard() {
    return (
        <div className="container mx-auto p-6">
            <Session />
            <Toaster />
        </div>
    );
}
