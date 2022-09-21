import { Link } from "@remix-run/react";
import Nav from "~/components/Nav";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <>
    <Nav/>
    <div>

    </div>
    </>
  );
}
