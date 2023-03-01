FROM golang
WORKDIR /go/src/github.com/devmeireles/product
COPY main.go .
RUN go build main.go
EXPOSE 3002
ENTRYPOINT ["./main"]