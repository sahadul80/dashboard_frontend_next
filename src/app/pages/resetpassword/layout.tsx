import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Reset",
    description: "Reset your account!",
};
export default function ResetPasswordLayout({
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