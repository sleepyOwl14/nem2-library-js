
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
import MosaicAliasTransactionBuffer from './MosaicAliasTransactionBuffer';
import MosaicDefinitionTransactionBuffer from './MosaicDefinitionTransactionBuffer';
import CommonBufferProperties from './CommonBufferProperties';
import CommonEmbeddedBufferProperties from './CommonEmbeddedBufferProperties';
import CommonBuffer from './CommonBuffer';

AccountLinkTransactionBuffer.Embedded = AccountLinkTransactionBuffer.EmbeddedAccountLinkTransactionBuffer;
AccountPropertyAddressBuffer.Embedded = AccountPropertyAddressBuffer.EmbeddedAddressPropertyTransactionBuffer;
AccountPropertiesEntityTypeTransactionBuffer.Embedded = AccountPropertiesEntityTypeTransactionBuffer.EmbeddedTransactionTypePropertyTransactionBuffer;
AddressAliasTransactionBuffer.Embedded = AddressAliasTransactionBuffer.EmbeddedAddressAliasTransactionBuffer;
HashLockTransactionBuffer.Embedded = HashLockTransactionBuffer.EmbeddedHashLockTransactionBuffer;
MosaicPropertyTransactionBuffer.Embedded = MosaicPropertyTransactionBuffer.EmbeddedMosaicPropertyTransactionBuffer;
MosaicAliasTransactionBuffer.Embedded = MosaicAliasTransactionBuffer.EmbeddedMosaicAliasTransactionBuffer;
MosaicDefinitionTransactionBuffer.Embedded = MosaicDefinitionTransactionBuffer.EmbeddedMosaicDefinitionTransactionBuffer;
TransferTransactionBuffer.Embedded = TransferTransactionBuffer.EmbeddedTransferTransactionBuffer;
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
    MosaicAliasTransactionBuffer,
    MosaicDefinitionTransactionBuffer,
    AddressAliasTransactionBuffer,
    HashLockTransactionBuffer,
    CommonBuffer,
}