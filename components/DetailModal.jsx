import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export default function DetailModal({
    title,
    children,
    isOpen,
    setIsOpen,
    contentClassName
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={contentClassName}>
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