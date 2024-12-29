export function getAvatarFallback(name) {
    if (name && name.length > 0) {
        return name.slice(0, 2).toUpperCase()
    }
    return "UN"
};