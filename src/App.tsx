import { Navbar } from "./components/navbar";
import { UserList } from "./components/user-list";

export const App = () => {
  return (
    <>
      <Navbar />

      <main className="container mb-4 relative">
        <UserList />
      </main>
    </>
  );
};
