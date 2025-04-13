package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserID       uint
	CartProducts []CartProduct
}

func WithCartRelations(db *gorm.DB) *gorm.DB {
	return db.Preload("CartProducts").
		Preload("CartProducts.Product").
		Preload("CartProducts.Product.Category").
		Preload("CartProducts.Product.Reviews")
}
