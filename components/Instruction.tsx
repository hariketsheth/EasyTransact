import AccountField, { Account } from './AccountField'
import DataField, { Data, dataTypes } from './DataField'
import styles from '../styles/Instruction.module.css'
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';

export interface InstructionType {
  'id': string,
  'programId': string,
  'accounts': Account[],
  'data': Data[]
}

function Instruction({ instruction, editInstruction, deleteInstruction, showDelete, index }: {
  instruction: InstructionType,
  editInstruction: Function,
  deleteInstruction: Function,
  showDelete: boolean,
  index: number
}) {
  const [reveal, setReveal] = useState(true);

  const onReveal = () => {
    setReveal(!reveal)
  };

  const addAccount: MouseEventHandler = (e) => {
    e.preventDefault();
    instruction.accounts.push({
      id: uuidv4(),
      pubKey: '',
      signer: false,
      writable: false
    });
    editInstruction(instruction)
  };

  const addData: MouseEventHandler = (e) => {
    e.preventDefault();
    instruction.data.push({
      id: uuidv4(),
      type: Object.keys(dataTypes)[0],
      value: ''
    });
    editInstruction(instruction)
  };

  const handlePublicKeyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    instruction.programId = e.target.value;
    editInstruction(instruction);
  };

  const handleEditAccount = (account: Account) => {
    instruction.accounts = instruction.accounts.map((acc) =>
      acc.id === account.id ? account : acc
    );
    editInstruction(instruction)
  };

  const handleDeleteAccount = (id: string) => {
    instruction.accounts = instruction.accounts.filter((acc) =>
      acc.id !== id
    )
    editInstruction(instruction)
  }

  const handleEditData = (data: Data) => {
    instruction.data = instruction.data.map((d) =>
      d.id === data.id ? data : d
    );
    editInstruction(instruction)
  };

  const handleDeleteData = (id: string) => {
    instruction.data = instruction.data.filter((d) =>
      d.id !== id
    )
    editInstruction(instruction)
  }

  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" checked={reveal} onChange={onReveal} />
      <h2 className="font-bold text-white collapse-title flex flex-row items-center">
        Instruction {index}
      </h2>
      <div className={`collapse-content ${styles.instruction}`}>
        {showDelete ?
          <button
            className="mr-2 w-full btn text-white bg-red-500 hover:bg-red-600"
            onClick={() => deleteInstruction(instruction.id)}
          >
            <FaTrash className="mr-2" /> Delete Instruction
          </button> : ''
        }
        <input
          type="text"
          value={instruction.programId}
          placeholder="Program ID"
          onChange={handlePublicKeyChange}
          className="input input-bordered input-primary w-full max-w-x"
        />
        <div>
          <h3 className="font-bold text-white my-2">Accounts</h3>
          <button
            className="btn bg-orange-500 hover:bg-orange:400 text-white"
            onClick={addAccount}
          >
            <FaPlus />
          </button>
          {
            instruction.accounts.map((account) =>
              <AccountField
                key={account.id}
                showDelete={instruction.accounts.length > 1}
                editAccount={handleEditAccount}
                deleteAccount={handleDeleteAccount}
                account={account} />
            )
          }
        </div>
        <div>
          <h3 className="font-bold text-white my-2">Data</h3>
          <button
            className="btn bg-orange-500 hover:bg-orange:400 text-white"
            onClick={addData}
          >
            <FaPlus />
          </button>
          {
            instruction.data.map((data) =>
              <DataField
                key={data.id}
                showDelete={instruction.data.length > 1}
                editData={handleEditData}
                deleteData={handleDeleteData}
                data={data} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Instruction
