import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import Navibar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return <Navibar />;
};
export default Home;
