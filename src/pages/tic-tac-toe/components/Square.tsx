import classNames from "classnames";

export default function Square({
  value,
  onSquareClick,
  className,
}: {
  value: string | null;
  onSquareClick: () => void;
  className: string | null;
}) {
  return (
    <button
      className={classNames(
        className,
        "text-2xl font-bold border h-[34px] w-[34px] text-center float-left"
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
