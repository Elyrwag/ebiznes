package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func SetupRoutes(e *echo.Echo) {
	api := e.Group("/api")
	api.GET("/products", controllers.GetProducts)
	api.POST("/submit-cart", controllers.SubmitCart)
	api.POST("/complete-payment", controllers.CompletePayment)

	api.HEAD("/health", func(c echo.Context) error {
		return c.NoContent(200)
	})
	api.GET("/health", func(c echo.Context) error {
		return c.String(200, "OK")
	})
}
