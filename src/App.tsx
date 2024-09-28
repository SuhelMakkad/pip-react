import { Navbar } from "./components/navbar";
import { UserCard } from "./components/user-card";
import { users } from "./lib/constants";

export const App = () => {
  return (
    <>
      <Navbar />

      <main className="container mb-4">
        <ul className="p-1 rounded-sm border shadow-sm grid gap-1 grid-cols-3 bg-muted min-h-[calc(100vh-5rem)]">
          {users.map((user) => (
            <li key={user.id}>
              <UserCard {...user} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
