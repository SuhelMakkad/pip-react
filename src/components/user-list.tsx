import { useRef } from "react";
import { UserCard } from "@/components/user-card";
import { usePip } from "@/hooks/use-pip";
import { users } from "@/lib/constants";

export const UserList = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { openInPipMode, exitPipMode, isInPipMode } = usePip(ref);

  return (
    <>
      <div>
        <ul
          ref={ref}
          className="p-1 rounded-sm border shadow-sm grid gap-1 grid-cols-3 bg-muted min-h-[calc(100vh-5rem)]"
        >
          {users.map((user) => (
            <li key={user.id}>
              <UserCard {...user} />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="absolute bottom-2 right-1/2 translate-x-1/2 rounded-full border shadow-sm text-xs px-2.5 py-1 bg-background"
        onClick={isInPipMode ? exitPipMode : openInPipMode}
      >
        {isInPipMode ? "Exit" : "Enter"} PIP mode
      </button>
    </>
  );
};
