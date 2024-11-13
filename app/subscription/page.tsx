import { auth } from "@clerk/nextjs/server";
import Navibar from "../_components/navbar";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return <Navibar />;
};

export default SubscriptionPage;
