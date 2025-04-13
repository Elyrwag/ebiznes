package main

import (
	"echo-go/database"
	"echo-go/routes"
	"github.com/labstack/echo/v4"
)

func main() {
	database.InitDB()
	e := echo.New()
	routes.SetupRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
