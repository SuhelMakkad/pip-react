import { useState, useRef, RefObject } from "react";

const isPiPSupported = "documentPictureInPicture" in window;

export const usePip = <T extends HTMLElement>(ref: RefObject<T | undefined>) => {
  const parentRef = useRef<HTMLElement>();
  const pipWindowRef = useRef<Window>();
  const [isInPipMode, setIsInPipMode] = useState(false);

  const exitPipMode = () => {
    window.focus();
    pipWindowRef.current?.close();

    if (ref.current && parentRef.current) {
      parentRef.current.append(ref.current);
      setIsInPipMode(false);
    }
  };

  const openInPipMode = async () => {
    if (!ref.current || !isPiPSupported) {
      setIsInPipMode(false);
      return;
    }

    const pipWindow = await window.documentPictureInPicture.requestWindow();
    pipWindowRef.current = pipWindow;

    // Copy style sheets over from the initial document
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
        const style = document.createElement("style");

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (error) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media.toString();
        link.href = styleSheet.href!;
        pipWindow.document.head.appendChild(link);

        console.log(error);
      }
    });

    parentRef.current = ref.current.parentElement || window.document.body;

    // Move the player to the Picture-in-Picture window.
    pipWindow.document.body.append(ref.current);
    setIsInPipMode(true);

    // Move the player back when the Picture-in-Picture window closes.
    pipWindow.addEventListener("pagehide", exitPipMode);
  };

  return { openInPipMode, isPiPSupported, isInPipMode, exitPipMode };
};