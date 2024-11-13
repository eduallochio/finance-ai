import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummeryCard from "./summery-card";
import { db } from "@/app/_lib/prisma";

interface SummeryCards {
  month: string;
}
const SummeryCards = async ({ month }: SummeryCards) => {
  const where = {
    date: {
      gte: new Date(`${month}-01`),
      lte: new Date(`${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
        },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
        },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      {/*PRIMEIRO CARD*/}
      <SummeryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      {/**OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummeryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummeryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receitas"
          amount={depositsTotal}
        />
        <SummeryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Investido"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummeryCards;
