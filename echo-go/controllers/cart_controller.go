package controllers

import (
	"echo-go/database"
	"echo-go/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetCarts(c echo.Context) error {
	var carts []models.Cart
	database.DB.Scopes(models.WithCartRelations).Find(&carts)
	return c.JSON(http.StatusOK, carts)
}

func GetCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.Scopes(models.WithCartRelations).First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Cart not found"})
	}
	return c.JSON(http.StatusOK, cart)
}

func CreateCart(c echo.Context) error {
	cart := new(models.Cart)
	// c.Bind(cart) adds cart from request into Cart struct
	if err := c.Bind(cart); err != nil {
		return err
	}
	database.DB.Create(&cart)
	return c.JSON(http.StatusCreated, cart)
}

func UpdateCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart
	if err := database.DB.First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Cart not found"})
	}
	if err := c.Bind(&cart); err != nil {
		return err
	}
	database.DB.Save(&cart)
	return c.JSON(http.StatusOK, cart)
}

func DeleteCart(c echo.Context) error {
	id := c.Param("id")
	if err := database.DB.Delete(&models.Cart{}, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Cart not found"})
	}
	return c.NoContent(http.StatusNoContent)
}
