import IncomeSVG from "../assets/Income.svg";
import OutcomeSVG from "../assets/Outcome.svg";

type TransactionTypeButtonProps = {
  transactionType: "Income" | "Outcome";
  selected?: boolean;
  handleModalSelectedType: (value: "Income" | "Outcome") => void;
};

export function TransactionTypeButton({
  transactionType,
  selected = false,
  handleModalSelectedType,
}: TransactionTypeButtonProps) {
  return (
    <button
    type="button"
      onClick={() => handleModalSelectedType(transactionType)}
      style={{
        backgroundColor: !selected
          ? "transparent"
          : transactionType === "Income"
          ? "rgba(18, 164, 84,0.1)"
          : "rgba(229, 46, 77, 0.1)",
      }}
      className={`flex flex-1 items-center justify-center gap-4 rounded-md border-[1.5px] ${
        !selected && "border-[#969CB2]"
      } px-8 py-4`}
    >
      <img
        src={transactionType === "Income" ? IncomeSVG : OutcomeSVG}
        alt={`Icone de ${transactionType}`}
      />
      <span className="text-sm text-[#363F5F]">{transactionType}</span>
    </button>
  );
}
