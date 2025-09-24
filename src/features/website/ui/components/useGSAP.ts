"use client";
import { useEffect } from "react";

export const useGSAP = (): void => {
  // const timeline = useRef<null>(null);

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    };

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (hero)
      setTimeout(() => {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
      }, 200);

    const features = document.querySelectorAll<HTMLElement>("[data-feature]");
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = "1";
        feature.style.transform = "translateY(0)";
      }, 400 + index * 150);
    });

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);
};
