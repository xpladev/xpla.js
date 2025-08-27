/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpgradeClient as MsgUpgradeClientV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client state
 */
export class MsgUpgradeClientV1 extends JSONSerializable<
  any,
  MsgUpgradeClientV1.Data,
  MsgUpgradeClientV1.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param client_state  upgraded client state
   * @param consensus_state upgraded consensus state, only contains enough information to serve as a basis of trust in update logic
   * @param proof_upgrade_client base64 encoded, proof that old chain committed to new client
   * @param proof_upgrade_consensus_state base64 encoded, proof that old chain committed to new consensus state
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public client_state: any | undefined,
    public consensus_state: any | undefined,
    public proof_upgrade_client: string,
    public proof_upgrade_consensus_state: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpgradeClientV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpgradeClientV1.Data,
    _?: boolean
  ): MsgUpgradeClientV1 {
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = data;
    return new MsgUpgradeClientV1(
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer
    );
  }

  public toData(_?: boolean): MsgUpgradeClientV1.Data {
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgUpgradeClient',
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    };
  }

  public static fromProto(
    proto: MsgUpgradeClientV1.Proto,
    _?: boolean
  ): MsgUpgradeClientV1 {
    return new MsgUpgradeClientV1(
      proto.clientId,
      proto.clientState,
      proto.consensusState,
      Convert.toBase64(proto.proofUpgradeClient),
      Convert.toBase64(proto.proofUpgradeConsensusState),
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgUpgradeClientV1.Proto {
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = this;
    return MsgUpgradeClientV1_pb.fromPartial({
      clientId: client_id,
      clientState: client_state,
      consensusState: consensus_state,
      proofUpgradeClient: Convert.fromBase64(proof_upgrade_client),
      proofUpgradeConsensusState: Convert.fromBase64(
        proof_upgrade_consensus_state,
      ),
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpgradeClient',
      value: MsgUpgradeClientV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpgradeClientV1 {
    return MsgUpgradeClientV1.fromProto(MsgUpgradeClientV1_pb.decode(msgAny.value));
  }
}

export namespace MsgUpgradeClientV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgUpgradeClient';
    client_id: string;
    client_state: any | undefined;
    consensus_state: any | undefined;
    proof_upgrade_client: string;
    proof_upgrade_consensus_state: string;
    signer: AccAddress;
  }
  export type Proto = MsgUpgradeClientV1_pb;
}
