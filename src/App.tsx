import { useEffect, useState } from "react";
import Modal from "react-modal";

import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";

import LogoSVG from "./assets/Logo.svg";
import FecharSVG from "./assets/Fechar.svg";
import { TransactionTypeButton } from "./components/TransactionTypeButton";

type TransactionType = {
  name: string;
  price: number;
  category: string;
  type: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "0",
    right: "0",
    bottom: "auto",
    transform: "translateY(-50%)",
    padding: "24px",
    borderRadius: "16px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInputName, setModalInputName] = useState("");
  const [modalInputPrice, setModalInputPrice] = useState(0);
  const [modalInputCategory, setModalInputCategory] = useState("");
  const [modalSelectedType, setModalSelectedType] = useState<
    "Income" | "Outcome"
  >("Income");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: TransactionType = {
      name: modalInputName,
      type: modalSelectedType,
      category: modalInputCategory,
      price: modalInputPrice,
    };
    console.log(newTransaction);
    setModalInputName("");
    setModalInputPrice(0);
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
          <img src={LogoSVG} alt="" />
          <button
            onClick={openModal}
            className="rounded-md bg-[#630ac1] px-4 py-3 text-xs font-semibold text-[#fff]"
          >
            Nova transação
          </button>
        </header>
        <main className="-translate-y-[100px]">
          <Summary />
          <TransactionList />
        </main>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#363F5F]">
            Cadastrar transação
          </h2>
          <button onClick={closeModal}>
            <img src={FecharSVG} alt="" />
          </button>
        </div>
        <form onSubmit={(e) => submitForm(e)} className="flex flex-col gap-2">
          <input
            className="rounded-md border border-[#D7D7D7] bg-[#E7E9EE] px-4 py-5 text-[#363F5F] placeholder-[#969CB2]"
            type="text"
            placeholder="Nome"
            value={modalInputName}
            onChange={(e) => setModalInputName(e.currentTarget.value)}
          />
          <input
            className="rounded-md border border-[#D7D7D7] bg-[#E7E9EE] px-4 py-5 text-[#363F5F] placeholder-[#969CB2]"
            type="number"
            min={0}
            placeholder="Preço"
            value={modalInputPrice}
            onChange={(e) =>
              setModalInputPrice(parseInt(e.currentTarget.value))
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
