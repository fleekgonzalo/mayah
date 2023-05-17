type AlertProps = {
  alertType: string;
  result: Error | void;
};
export const Alert = ({ alertType, result }: AlertProps) => {
  console.log("result", alertType, result);
  return (
    <div
      className={`alert bg-${alertType} text-white shadow-lg
    rounded-tl-none rounded-tr-none`}>
      <div>
        <span>
          {result?.message
            ? result.message
            : alertType !== "info"
            ? "successfully mirrored!"
            : ""}
        </span>
      </div>
    </div>
  );
};
