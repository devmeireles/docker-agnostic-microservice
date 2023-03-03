FROM golang

# ENV PROJECT_DIR=/app \
#     GO111MODULE=on \
#     CGO_ENABLED=1 \
#     GOBIN=/go/bin

# WORKDIR /app

# COPY . .

WORKDIR $GOPATH/src/mailer

RUN go mod init mailer
COPY . .

# Download all the dependencies
RUN go get -u github.com/confluentinc/confluent-kafka-go/v2/kafka

RUN go build -o /mailer

CMD [ "/mailer" ]

