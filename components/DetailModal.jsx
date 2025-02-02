import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export default function DetailModal({
    title,
    children,
    isOpen,
    setIsOpen
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}