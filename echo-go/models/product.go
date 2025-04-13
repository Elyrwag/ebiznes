package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name       string
	Price      float64
	CategoryID uint
	Category   Category
	Reviews    []Review
}

func WithProductRelations(db *gorm.DB) *gorm.DB {
	return db.Preload("Category").Preload("Reviews")
}
