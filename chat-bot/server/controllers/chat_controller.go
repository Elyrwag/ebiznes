package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
	"io"
	"net/http"
	"regexp"
	"server/models"
	"strings"
)

const chatServiceURL = "http://service:3334"

var endingPhrases = []string{
	"dziękuję",
	"dzięki",
	"to wszystko",
	"do widzenia",
	"pa",
	"na razie",
}

func HandleStart(c echo.Context) error {
	resp, err := http.Get(chatServiceURL + "/start")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error connecting to chat")
	}

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		fmt.Println("API error:", resp.StatusCode)
		fmt.Println("Response:", string(body))
		return c.JSON(http.StatusInternalServerError, "Response error")
	}

	var data models.ChatResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		fmt.Println("Decoding JSON error:", err)
		return c.JSON(http.StatusInternalServerError, "Error while decoding JSON")
	}

	return c.JSON(http.StatusOK, data)
}

func normalize(text string) string {
	// remove punctuation and convert to lowercase
	re := regexp.MustCompile(`[[:punct:]]`)
	clean := re.ReplaceAllString(text, "")
	return strings.ToLower(clean)
}

func containsEndingPhrase(input string) bool {
	normalizedInput := normalize(input)

	for _, phrase := range endingPhrases {
		normalizedPhrase := normalize(phrase)

		if strings.Contains(" "+normalizedInput+" ", " "+normalizedPhrase+" ") {
			return true
		}
	}
	return false
}

func HandleChat(c echo.Context) error {
	var requestData models.ChatRequest

	if err := json.NewDecoder(c.Request().Body).Decode(&requestData); err != nil {
		return c.String(http.StatusBadRequest, "Bad request data")
	}

	var resp *http.Response
	var err error

	if containsEndingPhrase(requestData.UserInput) {
		resp, err = http.Get(chatServiceURL + "/end")
	} else {
		jsonData, er := json.Marshal(map[string]string{"message": requestData.UserInput})
		if er != nil {
			return c.String(http.StatusInternalServerError, "Error while encoding JSON")
		}
		resp, err = http.Post(chatServiceURL + "/ask", "application/json", bytes.NewBuffer(jsonData))
	}

	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error connecting to chat")
	}

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		fmt.Println("Service error:", resp.StatusCode)
		fmt.Println("Response:", string(body))
		return c.JSON(http.StatusInternalServerError, "Response error")
	}

	var data models.ChatResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		fmt.Println("Decoding JSON error:", err)
		return c.JSON(http.StatusInternalServerError, "Error while decoding JSON")
	}

	return c.JSON(http.StatusOK, data)
}
