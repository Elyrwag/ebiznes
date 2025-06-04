FROM golang:1.24.2 AS builder

WORKDIR /app
COPY . .

RUN go mod tidy
RUN go build -o main .

FROM debian:bullseye-slim

WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 5000
CMD ["./main"]
