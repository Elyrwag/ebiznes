package models

import "gorm.io/gorm"

type CartProduct struct {
	gorm.Model
	CartID    uint
	ProductID uint
	Product   Product
	Count     uint
}
