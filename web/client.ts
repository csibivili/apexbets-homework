import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import { getKeypairFromFile } from "@solana-developers/helpers"
import { Buffer } from "buffer"

const programId = new PublicKey("6T48u8fxvn7N8DQKo3UHeGctpfw9bH95Ptp7fv6QJNKb")

;(async () => {
  // This will connect you to your local validator
  const connection = new Connection("http://127.0.0.1:8899", "confirmed")
  const keyPair = await getKeypairFromFile("~/.config/solana/id.json")

  // Every transaction requires a blockhash
  const blockhashInfo = await connection.getLatestBlockhash()
  // Create a new transaction
  const tx = new Transaction({
    ...blockhashInfo,
  })

  // Add our Hello World instruction
  tx.add(
    new TransactionInstruction({
      programId: programId,
      keys: [],
      data: Buffer.from([]),
    })
  )

  // Sign the transaction with your previously created keypair
  tx.sign(keyPair)

  // Send the transaction to the Solana network
  const txHash = await connection.sendRawTransaction(tx.serialize())

  console.log("Transaction sent with hash:", txHash)

  await connection.confirmTransaction({
    blockhash: blockhashInfo.blockhash,
    lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
    signature: txHash,
  })

  console.log(
    `Congratulations! Look at your ‘Hello World’ transaction in the Solana Explorer:
  https://explorer.solana.com/tx/${txHash}?cluster=custom`
  )
})()
