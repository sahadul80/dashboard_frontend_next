import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LogIn",
    description: "Login to Education Assistant",
};
export default function LogInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    );
}