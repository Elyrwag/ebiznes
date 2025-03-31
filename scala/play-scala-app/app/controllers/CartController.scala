package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import scala.collection.mutable.ListBuffer

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  case class CartItem(productID: Int, quantity: Int)
  case class Cart(id: Int, name: String, cartContents: ListBuffer[CartItem])

  object CartItem {
    implicit val cartFormat: OFormat[CartItem] = Json.format[CartItem]
  }

  object Cart {
    implicit val cartFormat: OFormat[Cart] = Json.format[Cart]
  }

  private var carts = ListBuffer(
    Cart(1, "Cart 1", ListBuffer(CartItem(1, 2), CartItem(2, 1))),
    Cart(2, "Cart 2", ListBuffer(CartItem(3, 10)))
  )

  def getAllCarts = Action {
    Ok(Json.toJson(carts))
  }

  def getCart(id: Int) = Action {
    carts.find(_.id == id) match {
      case Some(cart) => Ok(Json.toJson(cart))
      case None => NotFound
    }
  }

  def addCart: Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").as[String]
    val cartContents = (request.body \ "cartContents").as[ListBuffer[CartItem]]
    val id = carts.map(_.id).max + 1
    val newCart = Cart(id, name, cartContents)
    carts += newCart
    Created(Json.toJson(newCart))
  }

  def updateCart(id: Int): Action[JsValue] = Action(parse.json) { request =>
    carts.find(_.id == id) match {
      case Some(cart) =>
        val name = (request.body \ "name").as[String]
        val cartContents = (request.body \ "cartContents").as[ListBuffer[CartItem]]
        val updatedCart = cart.copy(name = name, cartContents = cartContents)
        carts = carts.map(cart => if (cart.id == id) updatedCart else cart)
        Ok(Json.toJson(updatedCart))
      case None => NotFound
    }
  }

  def deleteCart(id: Int) = Action {
    carts = carts.filterNot(_.id == id)
    NoContent
  }
}


