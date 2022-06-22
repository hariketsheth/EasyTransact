import ClusterPicker from "../components/ClusterPicker";
import React, { useState } from "react";
import PresetTransactionPicker from "../components/PresetTransactionPicker";
import TransactionForm from '../components/TransactionForm'
import Result from "../components/Result";
import { v4 as uuidv4 } from 'uuid';
import { dataTypes } from '../components/DataField';
import { useWallet } from '@solana/wallet-adapter-react';
import { InstructionType } from "../components/Instruction";

interface Props {
  setCluster: Function;
  cluster: string;
}

const Main: React.FC<Props> = ({ setCluster, cluster }) => {
  const { publicKey } = useWallet()

  const presets: { [key: string]: Function } = {
    'default': () => {
      return [{
        'id': uuidv4(),
        'programId': '',
        'accounts': [{
          id: uuidv4(),
          pubKey: '',
          signer: false,
          writable: false
        }],
        'data': [{
          id: uuidv4(),
          type: Object.keys(dataTypes)[0],
          value: ''
        }]
      }]
    },

    'transfer': () => {
      return [{
        'id': uuidv4(),
        'programId': '11111111111111111111111111111111',
        'accounts': [
          {
            id: uuidv4(),
            pubKey: publicKey?.toBase58() || '',
            signer: true,
            writable: true
          },
          {
            id: uuidv4(),
            pubKey: '',
            signer: false,
            writable: true
          }
        ],
        'data': [
          {
            id: uuidv4(),
            type: Object.keys(dataTypes)[2],
            value: '2'
          },
          {
            id: uuidv4(),
            type: Object.keys(dataTypes)[7],
            value: ''
          }
        ]
      }]
    }
  }

  const [instructions, setInstructions] = useState(
    presets['default']() as InstructionType[]
  )

  const [result, setResult] = useState({
    status: 'info',
    msg: "[Transaction result]"
  })

  const updateResult = (newResult: { status: string, msg: string }) => {
    setResult(newResult)
  }

  const handleAddInstruction = (preset: string) => {
    setInstructions(instructions.concat(presets[preset]()));
  }

  const handleDeleteInstruction = (id: string) => {
    setInstructions(instructions.filter(inst => inst.id !== id))
  }

  const handleEditInstruction = (instruction: InstructionType) => {
    setInstructions(instructions.map(inst =>
      inst.id === instruction.id ? instruction : inst
    ))
  }

  return (
    <div className="w-full h-4/5 flex py-2 justify-center items-start">
      <div className="w-1/4 flex flex-col gap-10">
        <ClusterPicker onChange={setCluster} />
        <PresetTransactionPicker onChange={(preset: string) => {
          setInstructions(presets[preset]())
        }} />
      </div>

      <div className="w-3/4 h-full pl-4 ml-4 border-l-2 border-gray-500/20">
        <TransactionForm
          instructions={instructions}
          updateResult={updateResult}
          addInstruction={handleAddInstruction}
          deleteInstruction={handleDeleteInstruction}
          editInstruction={handleEditInstruction}
        />
        <Result result={result} cluster={cluster} />
      </div>
    </div>
  )
}

export default Main
