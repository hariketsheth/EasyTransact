import { ChangeEventHandler } from "react"
import { FaTrash } from "react-icons/fa"

export interface Account {
  'id': string
  'pubKey': string,
  'signer': boolean,
  'writable': boolean
}

function AccountField({ account, showDelete, editAccount, deleteAccount }: {
  account: Account,
  showDelete: boolean,
  editAccount: Function,
  deleteAccount: Function
}) {
  const handlePubkeyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    account.pubKey = e.target.value;
    editAccount(account);
  };

  const handleSignerChange: ChangeEventHandler<HTMLInputElement> = () => {
    account.signer = !account.signer;
    editAccount(account);
  };

  const handleWritableChange: ChangeEventHandler<HTMLInputElement> = () => {
    account.writable = !account.writable;
    editAccount(account);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <input
        type="text"
        value={account.pubKey}
        placeholder="Public Key"
        onChange={handlePubkeyChange}
        className="input input-bordered input-primary w-full"
      />
      <label className="label cursor-pointer ml-4">
        <span className="label-text mr-2">Signer</span>
        <input
          type="checkbox"
          checked={account.signer}
          className="toggle toggle-primary"
          onChange={handleSignerChange}
        />
      </label>
      <label className="label cursor-pointer mx-4">
        <span className="label-text mr-2">Writable</span>
        <input
          type="checkbox"
          checked={account.writable}
          className="toggle toggle-primary"
          onChange={handleWritableChange}
        />
      </label>
      {showDelete ?
        <button
          className="ml-2 btn bg-red-500 hover:bg-red-600 text-white"
          onClick={() => deleteAccount(account.id)}
        >
          <FaTrash />
        </button> : ''}
    </div>
  )
}

export default AccountField
