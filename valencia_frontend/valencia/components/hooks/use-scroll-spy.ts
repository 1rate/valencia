import React from "react";
import { throttle } from "lodash"; // Используем throttle вместо debounce

interface UseScrollSpyProps {
  targetRef: React.RefObject<HTMLElement | null>;
  categoryId: number;
  onActive: (id: number) => void;
  offset?: number;
}

export const useScrollSpy = ({
  targetRef,
  categoryId,
  onActive,
  offset = 150,
}: UseScrollSpyProps) => {
  React.useEffect(() => {
    const checkVisibility = throttle(() => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      const isActive = sectionTop <= offset && sectionBottom >= offset;

      const isMajorityVisible =
        sectionTop <= windowHeight / 3 && sectionBottom >= windowHeight / 3;

      if (isActive || isMajorityVisible) {
        onActive(categoryId);
      }
    }, 100);

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [targetRef, categoryId, onActive, offset]);
};
