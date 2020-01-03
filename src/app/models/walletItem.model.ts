interface WalletItemDTO {
  description: string;
  amount: number;
  type: string;
  uid?: string;
}
export class WalletItem {
  description: string;
  amount: number;
  type: string;
  uid?: string;

  constructor(walletItemDTO: WalletItemDTO) {
    this.description = walletItemDTO && walletItemDTO.description || null;
    this.amount = walletItemDTO && walletItemDTO.amount || 0;
    this.type = walletItemDTO && walletItemDTO.type || null;
    //  this.uid = walletItemDTO && walletItemDTO.uid || null;
  }
}
