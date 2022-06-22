import Instructions from './Instructions'
import { InstructionType } from './Instruction'
import styles from '../styles/TransactionForm.module.css'
import { useConnection, useWallet  } from '@solana/wallet-adapter-react';
import { MouseEventHandler } from 'react'
import { dataTypes } from './DataField'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { struct } from '@solana/buffer-layout';

interface Props {
  instructions: InstructionType[];
  updateResult: Function;
  addInstruction: Function;
  deleteInstruction: Function;
  editInstruction: Function;
}

function TransactionForm({ instructions, updateResult, addInstruction, deleteInstruction, editInstruction }: Props) {

  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const submit: MouseEventHandler = async (e) => {
    e.preventDefault();

    updateResult({ status: 'info', msg: "Sending transaction..." });

    try {
      const signature = await sendAndConfirmTransaction();
      updateResult({ status: 'success', msg: signature });
    } catch (error: any) {
      updateResult({ status: 'error', msg: error.message });
    }
  }

  const sendAndConfirmTransaction = async () => {
    const transaction = new Transaction();

    for (const instruction of instructions) {
      const dataLayout = struct(instruction.data.map(d =>
        dataTypes[d.type][0](d.id)
      ));

      const dataBuffer = Buffer.alloc(dataLayout.span);

      const values: { [key: string]: any } = {}

      for (const dataItem of instruction.data) {
        values[dataItem.id] = dataTypes[dataItem.type][1](dataItem.value)
      }

      dataLayout.encode(values, dataBuffer)

      transaction.add(new TransactionInstruction({
        programId: new PublicKey(instruction.programId),
        keys: instruction.accounts.map(acc => {
          return {
            pubkey: new PublicKey(acc.pubKey),
            isSigner: acc.signer,
            isWritable: acc.writable
          }
        }),
        data: dataBuffer
      }));
    }

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'processed');

    return signature
  };

  return (
    <form className="container flex flex-col h-4/5">
      <div className={`flex flex-row justify-between items-center mb-4 ${styles.header}`}>
        <h1 className="font-bold text-white">Transaction</h1>
        <div>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              addInstruction('default');
            }}
          >
            Add Instruction
          </button>
          <button
            className="btn btn-primary"
            onClick={submit}>
            Go!
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <Instructions
          instructions={instructions}
          editInstruction={editInstruction}
          deleteInstruction={deleteInstruction}
        />
      </div>

    </form>
  )
}

export default TransactionForm
