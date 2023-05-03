import { useTransactions } from "../hooks/useTransactions";

import ExcluirSVG from "../assets/Excluir.svg";

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();
  return (
    <div className="mt-8 flex flex-col px-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl">Listagem</span>
        <span className="text-sm opacity-50">
          {transactions.length} {transactions.length <= 1 ? "item" : "itens"}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {transactions.length > 0
          ? transactions.map((transaction) => {
              return (
                <li
                  key={`${transaction.title} - ${transaction.createdAt}`}
                  className="flex flex-col justify-between gap-5 rounded-md bg-cards-bg px-6 py-4"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm">{transaction.title}</h2>
                      <button onClick={() => deleteTransaction(transaction.id)}>
                        <img className="h-4 w-4" src={ExcluirSVG} alt="" />
                      </button>
                    </div>

                    <span
                      className="text-xl"
                      style={{
                        color:
                          transaction.type === "Income" ? "#12A454" : "#E52E4D",
                      }}
                    >
                      {transaction.type === "Outcome" && "- "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-[#969CB2]">
                    <span>{transaction.category}</span>
                    <span>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(transaction.createdAt)
                      )}
                    </span>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
