import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]> 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetController: ActionSheetController
  ){

    /* 
      Apoontando shoppingListRef$ em Firebase -> 'shopping-list' node.
      Que significa não somente posso empurrar isso para this referência para
      o banco de dados, mas TAMBÉM tmeos acesso a tudo dentro desse nó.
    */

    this.shoppingListRef$ = this.database.list('shopping-list');

  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    /*
    Exibir uma folha de ações que oferece
    ao usuáiro as seguinte opções:

    1. Editar o ShoppingItem
    2. Deletar "     "
    3. Cancelar seleção
    */

    this.actionSheetController.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text : 'Edit',
          handler: () => {
            // Envie o usuário para o EditShoppingItemPage e passe a chave como um parâmetro.
            this.navCtrl.push(EditShoppingItemPage, 
              { shoppingItemId: shoppingItem.$key });
              
              
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // Apague a corrente ShoppingItem, passou através do paramêtro.
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();

  }

  navigateToAddShoppingPage() {
    // Navegar o usuário para o AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

}
