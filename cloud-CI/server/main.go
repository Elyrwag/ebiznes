package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"server/routes"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"*",
		},
		AllowMethods: []string{
			"GET", "POST",
		},
	}))

	routes.SetupRoutes(e)
	e.Logger.Fatal(e.Start("0.0.0.0:5000"))
}
