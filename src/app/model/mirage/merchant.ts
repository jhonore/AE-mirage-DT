import { GameInstance } from '../classes/game-instance';

export class MgMerchant {
  private quantities = [1, 10, 100];

  /**
   * Window with the price, quantity, fees, etc
   */
  get sellingSettingsWindow() {
    return this.instance?.gui?.sellingWindow?.bidHouseSellerBox;
  }

  get currentItemPrice() {
    const price = this.sellingSettingsWindow?.minPricesCache?.[
      this.sellingSettingsWindow?.item?.objectGID
    ]?.[this.quantities.indexOf(this.currentItemQuantity)];
    return price ?? 0;
  }

  get currentItemQuantity() {
    const quantity = this.sellingSettingsWindow?.quantity;
    return quantity ?? 0;
  }

  constructor(private instance: GameInstance) {
    
  }

  /**
   * Sells the selected item at the given price minus 1, for the selected quantity
   */
  sellCurrentItemAtCurrentPriceForCurrentQuantity() {
    this.instance.window.dofus.sendMessage('ExchangeObjectMovePricedMessage', {
      objectUID: this.sellingSettingsWindow?.item?.objectUID,
      quantity: this.currentItemQuantity,
      price: this.currentItemPrice - 1,
    });

    if (
      this.sellingSettingsWindow.item.quantity - this.currentItemQuantity > 0 &&
      this.sellingSettingsWindow.item.quantity - this.currentItemQuantity <
        this.currentItemQuantity
    ) {
      this.sellingSettingsWindow.quantitySelect.setValue(
        this.quantities[this.quantities.indexOf(this.currentItemQuantity) - 1],
      );
      this.sellingSettingsWindow.quantitySelect.emit(
        'change',
        this.quantities[this.quantities.indexOf(this.currentItemQuantity) - 1],
      );
    }
  }
}