import React from "react";

interface Props {
  result: { status: string, msg: string };
  cluster: string;
}

function Result({ result, cluster }: Props) {
  const resultClassNames: { [key: string]: string } = {
    'success': 'text-orange-500',
    'info': 'text-purple-600',
    'error': 'text-red-500'
  };

  return (
    <div className="flex flex-col gap-3 font-nunito text-xl pt-5">
      <label className="text-white">Result:</label>
      <div className={`${resultClassNames[result.status]} w-full bg-field rounded-xl py-5 px-6`}>
        {
          result.status === "success" ?
            <a
              href={`https://explorer.solana.com/tx/${result.msg}?cluster=${cluster}`}
              target="_blank"
              rel="noreferrer"
            >
              Transaction succeeded! Click to show it on Solana Explorer...
            </a> : result.msg
        }
      </div>
    </div>
  )
}

export default Result
