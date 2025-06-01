package models

type ChatRequest struct {
	UserInput string `json:"user_input"`
}

type ChatResponse struct {
	Response string `json:"response"`
}
