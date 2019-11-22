import {
  InternalActorRegistered, Transfer,
} from "./generated/Contract/UtilityBrandedToken"
import {RegisteredInternalActorEntity, TransferEntity} from "./generated/UtilityBrandedTokenSchema"

export function handleRegisteredInternalActor(event: InternalActorRegistered): void {
  let entity = new RegisteredInternalActorEntity(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.actor = event.params._actor
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = new TransferEntity(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params._from
  entity.to = event.params._to
  entity.value = event.params._value
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.save()
}