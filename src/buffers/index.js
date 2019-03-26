
import Uint8ArrayConsumableBuffer from './Uint8ArrayConsumableBuffer';
import UnresolvedMosaicBuffer from './UnresolvedMosaicBuffer';
import bufferUtils from './BufferUtils';
import TransactionBuffer from './TransactionBuffer';
import TransferTransactionBuffer from './TransferTransactionBuffer';
import AccountLinkTransactionBuffer from './AccountLinkTransactionBuffer';
import AccountPropertyAddressBuffer from './AccountPropertyAddressTransactionBuffer';
import AccountPropertiesEntityTypeTransactionBuffer from './AccountPropertiesEntityTypeTransactionBuffer';
import MosaicPropertyTransactionBuffer from './AccountPropertiesMosaicTransactionBuffer';
import AddressAliasTransactionBuffer from './AddressAliasTransactionBuffer';
import HashLockTransactionBuffer from './HashLockTransactionBuffer';
import AggregateTransactionBuffer from './AggregateTransactionBuffer';
import CommonBufferProperties from './CommonBufferProperties';
import CommonEmbeddedBufferProperties from './CommonEmbeddedBufferProperties';
import CommonBuffer from './CommonBuffer';

AccountLinkTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedAccountLinkTransactionBuffer;
AccountPropertyAddressBuffer.Embedded = HashLockTransactionBuffer.EmbeddedAddressPropertyTransactionBuffer;
AccountPropertiesEntityTypeTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedTransactionTypePropertyTransactionBuffer;
AddressAliasTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedAddressAliasTransactionBuffer;
HashLockTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedHashLockTransactionBuffer;
MosaicPropertyTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedMosaicPropertyTransactionBuffer;
TransferTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedTransferTransactionBuffer;
TransactionBuffer.Embedded = TransactionBuffer.EmbeddedTransactionBuffer;

export{
    AggregateTransactionBuffer,
    CommonBufferProperties,
    CommonEmbeddedBufferProperties,
    Uint8ArrayConsumableBuffer,
    UnresolvedMosaicBuffer,
    bufferUtils,
    TransferTransactionBuffer,
    TransactionBuffer,
    AccountLinkTransactionBuffer,
    AccountPropertyAddressBuffer,
    AccountPropertiesEntityTypeTransactionBuffer,
    MosaicPropertyTransactionBuffer,
    AddressAliasTransactionBuffer,
    HashLockTransactionBuffer,
    CommonBuffer,
}