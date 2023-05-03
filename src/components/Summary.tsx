import IncomeSVG from "../assets/Income.svg";
import OutcomeSVG from "../assets/Outcome.svg";
import TotalSVG from "../assets/Total.svg";

import { useTransactions } from "../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();

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
          <span>Última entrada dia 13 de abril</span>
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
          <span>Última saída dia 03 de abril</span>
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
          <span>01 à 16 de abril</span>
        </div>
      </div>
    </div>
  );
}
