import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {

    // Capturar o shoppingItemId como um NavParameter.
    const shoppingItemId = this.navParams.get('shoppingItemId');

    //  Sair da NavParam
    console.log(shoppingItemId);

    // Defina o escopo do nosso objeto do Firebase igual ao nosso item selecionado0
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    // Assine o objeto e atribua o resultado a this.shoppingItem
    this.shoppingItemSubscription = 
      this.shoppingItemRef$.subscribe(
      shoppingItem => this.shoppingItem = shoppingItem);
  }

  // Atualize o nó do nosso Firebase com novos dados do item
  editShoppingItem(
    shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.update(shoppingItem);
 
    // Envie de volta para o ShoppingListPage
    this.navCtrl.pop();  
  }
 
  ionViewWillLeave(){
    // Cancelar a subscrição do Observable ao sair da página
    this.shoppingItemSubscription.unsubscribe();
  }
  /* 
    ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  
  */
  // console.debug("[EditShoppingItemPage]: ngAfterViewInit")
}


