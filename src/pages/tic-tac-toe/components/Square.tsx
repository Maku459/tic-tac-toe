export default function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="text-2xl font-bold border h-[34px] w-[34px] text-center float-left"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
