import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import Navibar from "../_components/navbar";
import SummeryCards from "./_components/summery-cards";
import TimeSelect from "./_components/time-selects";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("/?month=01");
  }
  return (
    <>
      <Navibar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
      </div>
      <SummeryCards month={month} />
    </>
  );
};
export default Home;
