import IncomeSVG from "../assets/Income.svg";
import OutcomeSVG from "../assets/Outcome.svg";
import TotalSVG from "../assets/Total.svg";

import { useTransactions } from "../hooks/useTransactions";

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

  const oldestFromAll = transactions.reduce((r, o) =>
    o.createdAt < r.createdAt ? o : r
  );
  const newestFromAll = transactions.reduce((r, o) =>
    o.createdAt > r.createdAt ? o : r
  );

  const oldestFromAllDay = new Date(oldestFromAll.createdAt).getDay();
  const oldestFromAllMonth = new Date(oldestFromAll.createdAt).getMonth();

  const newestFromAllDay = new Date(newestFromAll.createdAt).getDay();
  const newestFromAllMonth = new Date(newestFromAll.createdAt).getMonth();

  const oldestAndNewestSameDay = () => {
    if (
      oldestFromAllDay + "/" + month[oldestFromAllMonth] ===
      newestFromAllDay + "/" + month[newestFromAllMonth]
    )
      return true;
    return false;
  };

  const newestIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((r, o) => (o.createdAt > r.createdAt ? o : r));
  const newestOutcome = transactions
    .filter((transaction) => transaction.type === "Outcome")
    .reduce((r, o) => (o.createdAt > r.createdAt ? o : r));

  const newestIncomeDay = new Date(newestIncome.createdAt).getDay();
  const newestIncomeMonth = new Date(newestIncome.createdAt).getMonth();
  const newestOutcomeDay = new Date(newestOutcome.createdAt).getDay();
  const newestOutcomeMonth = new Date(newestOutcome.createdAt).getMonth();

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
          <span>
            Última entrada dia {newestIncomeDay} de {month[newestIncomeMonth]}
          </span>
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
          <span>
            Última saída dia {newestOutcomeDay} de {month[newestOutcomeMonth]}
          </span>
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
          <span>
            {oldestAndNewestSameDay()
              ? `${newestFromAllDay} de ${month[newestFromAllMonth]}`
              : `${oldestFromAllDay} de ${month[oldestFromAllMonth]} à ${newestFromAllDay} de ${month[newestFromAllMonth]}`}
          </span>
        </div>
      </div>
    </div>
  );
}
