import { Button } from "./ui/button";

export default function PrimaryButton({ children }) {
    return (
        <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90">
            {children}
        </Button>
    )
}