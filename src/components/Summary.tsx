import IncomeSVG from "../assets/Income.svg";
import OutcomeSVG from "../assets/Outcome.svg";
import TotalSVG from "../assets/Total.svg";

import { useTransactions } from "../hooks/useTransactions";

type TransactionTime = {
  day: number;
  month: string;
};

const month = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function Summary() {
  const { transactions } = useTransactions();

  if (transactions.length <= 0) return null;
  const newestIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((r, o) => (o.createdAt > r.createdAt ? o : r));
  const newestOutcome = transactions
    .filter((transaction) => transaction.type === "Outcome")
    .reduce((r, o) => (o.createdAt > r.createdAt ? o : r));

  const newestIncomeString = `Última entrada dia ${new Date(
    newestIncome.createdAt
  ).getDay()} de ${month[new Date(newestIncome.createdAt).getMonth()]}`;
  const newestOutcomeString = `Última entrada dia ${new Date(
    newestOutcome.createdAt
  ).getDay()} de ${month[new Date(newestOutcome.createdAt).getMonth()]}`;

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "Income") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );
  return (
    <div className="flex gap-4 overflow-x-scroll px-6">
      <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-cards-bg px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base">Entradas</span>
          <img className="h-10 w-10" src={IncomeSVG} alt="" />
        </div>
        <div className="flex flex-col">
          <strong className="text-3xl font-normal leading-[45px]">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.deposits)}
          </strong>
          <span>{newestIncomeString}</span>
        </div>
      </div>
      <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-cards-bg px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-base">Saidas</span>
          <img className="h-10 w-10" src={OutcomeSVG} alt="" />
        </div>
        <div className="flex flex-col">
          <strong className="text-3xl font-normal leading-[45px]">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.withdraws)}
          </strong>
          <span>{newestOutcomeString}</span>
        </div>
      </div>
      <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-[#33CC95] px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-base">Total</span>
          <img className="h-10 w-10" src={TotalSVG} alt="" />
        </div>
        <div className="flex flex-col">
          <strong className="text-3xl font-normal leading-[45px]">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.total)}
          </strong>
          <br />
        </div>
      </div>
    </div>
  );
}
