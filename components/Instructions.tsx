import Instruction, { InstructionType } from './Instruction'

function Instructions({ instructions, editInstruction, deleteInstruction }: {
  instructions: InstructionType[],
  editInstruction: Function,
  deleteInstruction: Function
}) {
  const instructionElements = instructions.map((instruction, index) =>
    <Instruction
      key={instruction.id}
      instruction={instruction}
      editInstruction={editInstruction}
      deleteInstruction={deleteInstruction}
      showDelete={instructions.length > 1}
      index={index + 1}
    />);

  return (
    <>
      {instructionElements}
    </>
  )
}

export default Instructions
