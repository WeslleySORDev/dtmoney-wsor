import LogoSVG from "./assets/Logo.svg";
import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";

function App() {
  return (
    <div className="flex w-full flex-col">
      <header className="flex justify-between gap-16 bg-header-bg px-6 pb-32 pt-16">
        <img src={LogoSVG} alt="" />
        <button className="rounded-md bg-[#630ac1] px-4 py-3 text-xs font-semibold text-[#fff]">
          Nova transação
        </button>
      </header>
      <main className="-translate-y-[100px]">
        <Summary />
        <TransactionList />
      </main>
    </div>
  );
}

export default App;
