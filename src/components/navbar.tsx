import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <nav className="container py-3 flex items-center justify-between">
      <h1 className="font-medium">PIP React</h1>

      <ThemeToggle />
    </nav>
  );
};
