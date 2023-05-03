import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

import { v4 as uuid } from "uuid";

interface ITransaction {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => void;
  deleteTransaction(id: string): void;
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const localTransactions = localStorage.getItem("wsor-dtmoney");
    if (localTransactions) {
      setTransactions(JSON.parse(localTransactions));
    }
  }, []);

  function createTransaction(transactionInput: ITransactionInput) {
    const newTransactions: any = [
      ...transactions,
      {
        ...transactionInput,
        id: uuid(),
        createdAt: new Date(),
      },
    ];
    localStorage.setItem("wsor-dtmoney", JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  }

  function deleteTransaction(id: string) {
    const indexOfTransaction = transactions.findIndex(
      (transaction) => transaction.id === id
    );
    let newTransactions = [...transactions];
    newTransactions.splice(indexOfTransaction, 1);
    if (window.confirm("Deseja realmente apagar o item da lista?")) {
      localStorage.setItem("wsor-dtmoney", JSON.stringify(newTransactions));
      setTransactions(newTransactions);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
