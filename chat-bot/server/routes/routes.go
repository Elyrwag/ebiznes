package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func SetupRoutes(e *echo.Echo) {
	e.GET("/start", controllers.HandleStart)
	e.POST("/chat", controllers.HandleChat)
}
