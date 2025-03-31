package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import scala.collection.mutable.ListBuffer

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  case class Category(id: Int, name: String)

  object Category {
    implicit val categoryFormat: OFormat[Category] = Json.format[Category]
  }

  private var categories = ListBuffer(
    Category(1, "Category 1"),
    Category(2, "Category 2")
  )

  def getAllCategories = Action {
    Ok(Json.toJson(categories))
  }

  def getCategory(id: Int) = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound
    }
  }

  def addCategory: Action[JsValue] = Action(parse.json) { request =>
    val name = (request.body \ "name").as[String]
    val id = categories.map(_.id).max + 1
    val newCategory = Category(id, name)
    categories += newCategory
    Created(Json.toJson(newCategory))
  }

  def updateCategory(id: Int): Action[JsValue] = Action(parse.json) { request =>
    categories.find(_.id == id) match {
      case Some(category) =>
        val name = (request.body \ "name").as[String]
        val updatedCategory = category.copy(name = name)
        categories = categories.map(category => if (category.id == id) updatedCategory else category)
        Ok(Json.toJson(updatedCategory))
      case None => NotFound
    }
  }

  def deleteCategory(id: Int) = Action {
    categories = categories.filterNot(_.id == id)
    NoContent
  }
}


