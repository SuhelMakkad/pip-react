import { forwardRef, useEffect, useRef } from "react";
import { UserCard } from "@/components/user-card";

import { usePip } from "@/hooks/use-pip";

import { users } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PictureInPicture2 } from "lucide-react";
import { useTheme } from "./theme-provider";

export const UserList = () => {
  const ref = useRef<HTMLUListElement>(null);

  const { theme } = useTheme();
  const { openInPipMode, exitPipMode, isInPipMode, isPiPSupported, pipWindowRef } = usePip(ref);

  useEffect(() => {
    pipWindowRef.current?.document.documentElement.classList.remove("light", "dark");
    pipWindowRef.current?.document.documentElement.classList.add(theme);
  }, [theme, pipWindowRef]);

  return (
    <>
      <List ref={ref} className={isInPipMode ? "min-h-screen" : ""} />

      {isInPipMode && (
        <div className="text-sm flex flex-col justify-center mt-28">
          <PictureInPicture2 className="w-28 h-28 text-muted-foreground/50 mx-auto" />
          <p className="text-center text-muted-foreground">
            Click the button below to exit PIP mode.
          </p>
        </div>
      )}

      {isPiPSupported ? (
        <button
          className={cn(
            "bottom-3 right-1/2 mx-auto flex rounded-full border shadow-sm text-xs px-2.5 py-1 bg-primary text-primary-foreground",
            isInPipMode ? "static mt-4" : "absolute translate-x-1/2"
          )}
          onClick={isInPipMode ? exitPipMode : openInPipMode}
        >
          {isInPipMode ? "Exit" : "Enter"} PIP mode
        </button>
      ) : (
        <div className="absolute bottom-3 right-1/2 translate-x-1/2 border text-sm py-1 px-2.5 rounded-md">
          <span>PIP mode is not supported in your browser.</span>
        </div>
      )}
    </>
  );
};

const List = forwardRef<HTMLUListElement, { className?: string }>((props, ref) => {
  return (
    <div>
      <ul
        ref={ref}
        className={cn(
          "p-1 rounded-sm border shadow-sm grid gap-1 sm:grid-cols-3 grid-cols-2 bg-muted min-h-[calc(100vh-5rem)]",
          props.className
        )}
      >
        {users.map((user) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
});
