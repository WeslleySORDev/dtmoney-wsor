import LogoSVG from "./assets/Logo.svg";
import { Summary } from "./components/Summary";

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
        <div className="mt-8 flex flex-col px-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xl">Listagem</span>
            <span className="text-sm opacity-50">2 itens</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-5 rounded-md bg-cards-bg px-6 py-4">
              <div className="flex flex-col">
                <h2 className="text-sm">Desenvolvimento de site</h2>
                <span className="text-xl text-[#12A454]">R$ 12.000,00</span>
              </div>
              <div className="flex justify-between text-sm text-[#969CB2]">
                <span>Vendas</span>
                <span>13/04/2021</span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5 rounded-md bg-cards-bg px-6 py-4">
              <div className="flex flex-col">
                <h2 className="text-sm">Hamburgueria Pizzy</h2>
                <span className="text-xl text-[#E52E4D]">-R$ 59,00</span>
              </div>
              <div className="flex justify-between text-sm text-[#969CB2]">
                <span>Alimentação</span>
                <span>13/04/2021</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
