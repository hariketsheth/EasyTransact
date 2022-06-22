import React from "react";

interface Props {
  onChange: Function;
}

function ClusterPicker({onChange} : Props) {


  return (
    <div className="flex flex-col gap-3 font-nunito text-xl">
      <label className="text-white">Pick a cluster:</label>
      <select
        className="select select-bordered border-orange-normal w-full max-w-xs"
        defaultValue={"devnet"}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="devnet">Devnet (Recommended)</option>
        <option value="testnet">Testnet</option>
        <option value="mainnet-beta">Mainnet Beta (Not Recommended)</option>
      </select>
    </div>
  )
}

export default ClusterPicker
