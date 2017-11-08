import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Criar um novo Objeto
 shoppingItem = {} as ShoppingItem

 shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

 constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private database: AngularFireDatabase
    ) {
      this.shoppingItemRef$ = this.database.list('shopping-list');
     }

     addShoppingItem(shoppingItem: ShoppingItem){
        // Registrar os resultados para o console
      // console.log(shoppingItem);
      /*
      Criar um novo objeto anonimo e converter itemNumber para um numero.
      Empurrar isso para nosso Firebase base de dados sob o 'shopping-list'
      node.
      */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Resetar seu ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Navegar o usuário atrás para o ShoppingPage
    this.navCtrl.pop();
  }
}
