import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export const UserCard = (props: { id: number; name: string; email: string }) => {
  return (
    <div className="py-4 border rounded-sm flex h-full justify-center flex-col gap-1 items-center px-4 bg-background">
      <Avatar>
        <AvatarFallback>{getInitials(props.name)}</AvatarFallback>
      </Avatar>

      <span className="text-xs text-muted-foreground">{props.name}</span>
    </div>
  );
};
