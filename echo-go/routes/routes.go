package routes

import (
	"echo-go/controllers"
	"github.com/labstack/echo/v4"
	"net/http"
)

func SetupRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	products := e.Group("/product")
	products.GET("", controllers.GetProducts)
	products.GET("/:id", controllers.GetProduct)
	products.POST("", controllers.CreateProduct)
	products.PUT("/:id", controllers.UpdateProduct)
	products.DELETE("/:id", controllers.DeleteProduct)

	carts := e.Group("/cart")
	carts.GET("", controllers.GetCarts)
	carts.GET("/:id", controllers.GetCart)
	carts.POST("", controllers.CreateCart)
	carts.PUT("/:id", controllers.UpdateCart)
	carts.DELETE("/:id", controllers.DeleteCart)
}
