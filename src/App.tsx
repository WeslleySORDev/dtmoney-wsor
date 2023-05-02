import LogoSVG from "./assets/Logo.svg";

import IncomeSVG from "./assets/Income.svg";
import OutcomeSVG from "./assets/Outcome.svg";
import TotalSVG from "./assets/Total.svg";

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
        <div className="flex gap-4 overflow-x-scroll px-6">
          <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-cards-bg px-6 py-4">
            <div className="flex justify-between">
              <span className="text-base">Entradas</span>
              <img className="h-10 w-10" src={IncomeSVG} alt="" />
            </div>
            <div className="flex flex-col">
              <strong className="text-3xl font-normal leading-[45px]">R$ 17.400,00</strong>
              <span>Última entrada dia 13 de abril</span>
            </div>
          </div>
          <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-cards-bg px-6 py-4">
            <div className="flex justify-between">
              <span className="text-base">Saidas</span>
              <img className="h-10 w-10" src={OutcomeSVG} alt="" />
            </div>
            <div className="flex flex-col">
              <strong className="text-3xl font-normal leading-[45px]">R$ 1.259,00</strong>
              <span>Última saída dia 03 de abril</span>
            </div>
          </div>
          <div className="flex h-[200px] min-w-[300px] flex-col justify-between rounded-md bg-[#33CC95] text-white px-6 py-4">
            <div className="flex justify-between">
              <span className="text-base">Total</span>
              <img className="h-10 w-10" src={TotalSVG} alt="" />
            </div>
            <div className="flex flex-col">
              <strong className="text-3xl font-normal leading-[45px]">R$ 16.141,00</strong>
              <span>01 à 16 de abril</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
