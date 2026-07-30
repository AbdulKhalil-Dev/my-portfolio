import { useEffect } from "react";
import { useLenis } from "@/providers/smooth-scroll-provider";

export function useLenisModal(open: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }

    // Cleanup: Ensure scroll resumes if component unmounts unexpectedly
    return () => {
      lenis.start();
    };
  }, [open, lenis]);
}