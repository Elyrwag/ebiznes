// 53 asserts

package controllers

import (
	"github.com/mohae/deepcopy"
	"github.com/stretchr/testify/assert"
	"net/http"
	"server/models"
	"strconv"
	"testing"
)

func TestValidateCart(t *testing.T) {
	cart := models.Cart{Items: []models.CartItem{
		{Product: models.Product{Name: "Produkt 1"}, Quantity: 2},
	}}

	t.Run("Empty cart should return error", func(t *testing.T) {
		c := deepcopy.Copy(cart).(models.Cart) // just like in python, yay...
		c.Items = []models.CartItem{}

		err := validateCart(c)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Cart cannot be empty")
	})

	t.Run("Cart with empty product name should return error", func(t *testing.T) {
		c := deepcopy.Copy(cart).(models.Cart)
		c.Items[0].Product.Name = ""

		err := validateCart(c)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Product name is required")
	})

	t.Run("Cart with zero quantity should return error", func(t *testing.T) {
		c := deepcopy.Copy(cart).(models.Cart)
		c.Items[0].Quantity = 0

		err := validateCart(c)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Quantity must be greater than 0")
	})

	t.Run("Cart with negative quantity should return error", func(t *testing.T) {
		c := deepcopy.Copy(cart).(models.Cart)
		c.Items[0].Quantity = -20

		err := validateCart(c)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Quantity must be greater than 0")
	})

	t.Run("Valid cart should pass", func(t *testing.T) {
		err := validateCart(cart)
		assert.NoError(t, err)
	})
}

func TestValidatePayment(t *testing.T) {
	transaction := models.Transaction{
		Customer: models.Customer{
			Name:       "Test",
			Surname:    "Testman",
			Email:      "ttest@example.com",
			CardNumber: "1234567890123456",
		},
		Cart: models.Cart{
			Items: []models.CartItem{
				{Product: models.Product{Name: "Produkt 1"}, Quantity: 2},
			},
		},
		Total: 20.00,
	}

	t.Run("Missing customer name should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.Name = ""

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Customer name and surname are required")
	})

	t.Run("Missing customer surname should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.Surname = ""

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Customer name and surname are required")
	})

	t.Run("Missing email should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.Email = ""

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Customer email is required")
	})

	t.Run("Missing card number should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.CardNumber = ""

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Card number is required")
	})

	t.Run("Too short card number should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.CardNumber = "123"

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Card number must be 16 digits long")
	})

	t.Run("Card number contains letters should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Customer.CardNumber = "12345678abcd5678"

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Card number must contain only digits")
	})

	t.Run("Total equal to zero should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Total = 0

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Total amount must be greater than 0")
	})

	t.Run("Negative total should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Total = -30

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Total amount must be greater than 0")
	})

	t.Run("Empty items list should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Cart.Items = []models.CartItem{}

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Cart cannot be empty")
	})

	t.Run("Non-existing product should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Cart.Items[0].Product.Name = "Car"

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Product 'Car' not found")
	})

	t.Run("Quantity zero should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Cart.Items[0].Quantity = 0

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Quantity must be greater than 0")
	})

	t.Run("Wrong total value (too much) should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Total = 999.99

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Total amount mismatch")
	})

	t.Run("Wrong total value (less than) should return error", func(t *testing.T) {
		p := deepcopy.Copy(transaction).(models.Transaction)
		p.Total = 10.00

		err := validatePayment(p)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), strconv.Itoa(http.StatusBadRequest))
		assert.Contains(t, err.Error(), "Total amount mismatch")
	})

	t.Run("Valid payment should pass", func(t *testing.T) {
		err := validatePayment(transaction)
		assert.NoError(t, err)
	})
}
