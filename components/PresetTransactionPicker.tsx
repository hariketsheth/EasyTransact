import React from "react";

interface Props {
  onChange: Function;
}

function PresetTransactionPicker({onChange}: Props) {


  return (
    <div className="flex flex-col gap-3 font-nunito text-white text-xl">
      <label className="text-white">Pick a preset transaction:</label>
      <button className="btn" onClick={() => onChange('default')}>
        Default
      </button>
      <button className="btn" onClick={() => onChange('transfer')}>
        Transfer
      </button>
    </div>
  )
}

export default PresetTransactionPicker
