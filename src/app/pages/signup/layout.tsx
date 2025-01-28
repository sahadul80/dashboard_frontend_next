import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignUp",
    description: "Register to Education Assistant",
};
export default function SignUpLayout({
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