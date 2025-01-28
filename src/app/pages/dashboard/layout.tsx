import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Index",
    description: "Free Education for All!",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    return (
        <>
            {children}
        </>
    )
}