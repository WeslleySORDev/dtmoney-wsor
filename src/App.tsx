import { useEffect, useState } from "react";
import Modal from "react-modal";

import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";

import LogoSVG from "./assets/Logo.svg";
import FecharSVG from "./assets/Fechar.svg";
import { TransactionTypeButton } from "./components/TransactionTypeButton";
import { useTransactions } from "./hooks/useTransactions";

type TransactionType = {
  title: string;
  amount: number;
  category: string;
  type: string;
};

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInputTitle, setModalInputTitle] = useState("");
  const [modalInputAmount, setModalInputAmount] = useState(0);
  const [modalInputCategory, setModalInputCategory] = useState("");
  const [modalSelectedType, setModalSelectedType] = useState<
    "Income" | "Outcome"
  >("Income");

  const { createTransaction } = useTransactions();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: TransactionType = {
      title: modalInputTitle,
      type: modalSelectedType,
      category: modalInputCategory,
      amount: modalInputAmount,
    };
    createTransaction(newTransaction);
    setModalInputTitle("");
    setModalInputAmount(0);
    setModalInputCategory("");
    setModalSelectedType("Income");
    closeModal();
  };
  const handleModalSelectedType = (value: "Income" | "Outcome") => {
    setModalSelectedType(value);
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function isBigScreen(): Boolean {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  }
  useEffect(() => {
    Modal.setAppElement("#modal");
  }, []);
  return (
    <>
      <div
        className={`flex w-full flex-col ${
          modalIsOpen && "max-h-screen overflow-hidden"
        }`}
      >
        <header className="flex justify-between gap-16 bg-header-bg px-6 pb-32 pt-16">
          <img className="lg:h-10 lg:w-44" src={LogoSVG} alt="" />
          <button
            onClick={openModal}
            className="rounded-md bg-[#630ac1] px-4 py-3 text-xs font-semibold text-[#fff] lg:px-8 lg:text-base"
          >
            Nova transação
          </button>
        </header>
        <main className="-translate-y-[100px] lg:-translate-y-[80px]">
          <Summary />
          <TransactionList />
        </main>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            width: isBigScreen() ? "50%" : "100%",
            top: "50%",
            left: "0",
            right: "0",
            bottom: "auto",
            transform: "translateY(-50%)",
            marginInline: isBigScreen() ? "auto" :"0px",
            padding: isBigScreen() ? "48px 36px" :"24px",
            borderRadius: isBigScreen() ? "5px" : "16px",
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#363F5F]">
            Cadastrar transação
          </h2>
          <button onClick={closeModal}>
            <img src={FecharSVG} alt="" />
          </button>
        </div>
        <form onSubmit={(e) => submitForm(e)} className="flex flex-col gap-2 lg:gap-4 lg:mt-8">
          <input
            className="rounded-md border border-[#D7D7D7] bg-[#E7E9EE] px-4 py-5 text-[#363F5F] placeholder-[#969CB2]"
            type="text"
            placeholder="Nome"
            value={modalInputTitle}
            onChange={(e) => setModalInputTitle(e.currentTarget.value)}
          />
          <input
            className="rounded-md border border-[#D7D7D7] bg-[#E7E9EE] px-4 py-5 text-[#363F5F] placeholder-[#969CB2]"
            type="number"
            min={0}
            placeholder="Preço"
            value={modalInputAmount}
            onChange={(e) =>
              setModalInputAmount(parseInt(e.currentTarget.value))
            }
          />
          <div className="flex w-full gap-2">
            <TransactionTypeButton
              selected={modalSelectedType === "Income"}
              handleModalSelectedType={handleModalSelectedType}
              transactionType="Income"
            />
            <TransactionTypeButton
              selected={modalSelectedType === "Outcome"}
              handleModalSelectedType={handleModalSelectedType}
              transactionType="Outcome"
            />
          </div>
          <input
            className="rounded-md border border-[#D7D7D7] bg-[#E7E9EE] px-4 py-5 text-[#363F5F] placeholder-[#969CB2]"
            type="text"
            placeholder="Categoria"
            value={modalInputCategory}
            onChange={(e) => setModalInputCategory(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-header-bg py-5 text-center text-text-color"
          >
            Cadastrar
          </button>
        </form>
      </Modal>
    </>
  );
}

export default App;
