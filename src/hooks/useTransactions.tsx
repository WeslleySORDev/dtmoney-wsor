import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

interface ITransaction {
  id: number;
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
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
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

  async function createTransaction(transactionInput: ITransactionInput) {
    const newTransactions: any = [
      ...transactions,
      {
        ...transactionInput,
        createdAt: new Date(),
      },
    ];
    localStorage.setItem("wsor-dtmoney", JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
