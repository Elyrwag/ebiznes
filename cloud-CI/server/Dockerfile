FROM golang:1.24.2

WORKDIR /app
COPY . .

RUN go mod tidy

EXPOSE 5000
CMD ["go", "run", "main.go"]
