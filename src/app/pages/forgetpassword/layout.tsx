import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password?",
    description: "Retrive your account!",
};
export default function ForgetPasswordLayout({
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