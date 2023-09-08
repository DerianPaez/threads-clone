import { Outlet } from "react-router-dom";

export default function LayoutSpiral() {
  return (
    <main className="dark bg-primary-background bg-login h-screen w-screen max-h-screen">
      <div className="fixed w-full h-full flex justify-center items-center">
        <img
          style={{ maxWidth: "initial" }}
          className="h-screen w-[calc(100vh)] lg:w-[calc(100vh+300px)] lg:h-[calc(100vh+300px)] object-cover object-center animate-rotateSlowly touch-none select-none pointer-events-none"
          src="/background-login.png"
        />
      </div>
      <Outlet />
    </main>
  );
}
