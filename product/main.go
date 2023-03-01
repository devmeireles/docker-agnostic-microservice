package main

import (
	"log"
	"net/http"
	"encoding/json"
	"time"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string)
	resp["status"] = "working from Go runtime"
	resp["when"] = time.Now().String()
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	return
}

func main() {
	http.HandleFunc("/health", healthHandler)
	log.Fatal(http.ListenAndServe(":3002", nil))
}