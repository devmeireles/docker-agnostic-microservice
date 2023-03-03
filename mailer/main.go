package main

import (
    "github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"net/smtp"
	"html/template"
	"encoding/json"
	"time"
	"fmt"
	"log"
	"bytes"
)

func main() {
	mailAuth := smtp.CRAMMD5Auth("tempuser", "temppassword")
	from := "not-reply@mail.com"

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "mailer",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{"register-topic", "^aRegex.*[Tt]opic"}, nil)

	run := true

	for run {
		msg, err := c.ReadMessage(time.Second)
		if err == nil {
			fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))

			type MsgStruct struct {
				Name  string `json:"name"`
				Email string `json:"email"`
			}
		
			var msgData MsgStruct
			json.Unmarshal([]byte(msg.Value), &msgData)

			templateData := struct {
				UserName string
			}{
				UserName: msgData.Name,
			}
		
			mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
			email := "mail@sample.com"
			to := []string{email}
			body := parseTemplate("WELCOME", templateData)
			subject := "Welcome!"
			subjectBody := "Subject: " + subject + "!\n"
			msg := []byte(subjectBody + mime + "\n" + body)
		
			err := smtp.SendMail("mailhog:1025", mailAuth, from, to, msg)
			if err != nil {
				log.Fatal(err)
			}

		} else if !err.(kafka.Error).IsTimeout() {
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}

	c.Close()
}

func parseTemplate(mailType string, data interface{}) string {
	templateFile := chooseTemplateFile(mailType)
	t, err := template.ParseFiles(templateFile)
	if err != nil {
		fmt.Println(err)
	}
	buf := new(bytes.Buffer)

	if err = t.Execute(buf, data); err != nil {
		fmt.Println(err)
	}

	return buf.String()
}

func chooseTemplateFile(mailType string) string {
	var template string
	switch mailType {
	case "WELCOME":
		template = "./templates/welcome.html"
	}

	return template
}