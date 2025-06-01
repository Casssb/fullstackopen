import LogInOut from '@/components/LogInOut';
import Notifier from '@/components/Notifier';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/Books" className="[&.active]:font-bold">
          Books
        </Link>
        <Link to="/Authors" className="[&.active]:font-bold">
          Authors
        </Link>
        <Link to="/Recommended" className="[&.active]:font-bold">
          Recommended
        </Link>
        <LogInOut />
      </div>
      <hr />
      <Outlet />
      <Notifier />
      <TanStackRouterDevtools />
    </>
  ),
});
