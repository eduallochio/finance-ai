import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  // Converte os valores Decimal
  // Converte valores Decimal do Prisma para números nativos do JavaScript.
  // Isso é necessário porque apenas objetos JavaScript puros podem ser passados
  // de Server Components para Client Components no Next.js.
  // com isso dava erros no retorno da informação.
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber(),
  }));

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={formattedTransactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
