package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import scala.collection.mutable.ListBuffer

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  case class Product(id: Int, name: String, categoryID: Int, price: Double)

  object Product {
    implicit val productFormat: OFormat[Product] = Json.format[Product]
  }

  private var products = ListBuffer(
    Product(1, "Product 1", 2, 100.0),
    Product(2, "Product 2", 1, 200.0)
  )

  def getAllProducts = Action {
    Ok(Json.toJson(products))
  }

  def getProduct(id: Int) = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  def addProduct: Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").as[String]
    val price = (request.body \ "price").as[Double]
    val categoryID = (request.body \ "categoryID").as[Int]
    val id = products.map(_.id).max + 1
    val newProduct = Product(id, name, categoryID, price)
    products += newProduct
    Created(Json.toJson(newProduct))
  }

  def updateProduct(id: Int): Action[JsValue] = Action(parse.json) { request =>
    products.find(_.id == id) match {
      case Some(product) =>
        val name = (request.body \ "name").as[String]
        val price = (request.body \ "price").as[Double]
        val categoryID = (request.body \ "categoryID").as[Int]
        val updatedProduct = product.copy(name = name, categoryID = categoryID, price = price)
        products = products.map(product => if (product.id == id) updatedProduct else product)
        Ok(Json.toJson(updatedProduct))
      case None => NotFound
    }
  }

  def deleteProduct(id: Int) = Action {
    products = products.filterNot(_.id == id)
    NoContent
  }
}


