import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleIsMobile = () => setIsMobile(window.innerWidth < 768);
        handleIsMobile();

        window.addEventListener("resize", handleIsMobile);

        return () => window.removeEventListener("resize", handleIsMobile);
    }, [])

    return isMobile;
}