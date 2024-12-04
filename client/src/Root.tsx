import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import { User } from "./types";
import { Dispatch, SetStateAction } from "react";

type RootProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function Root({ user, setUser }: RootProps) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </>
  );
}
