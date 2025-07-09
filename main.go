package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	supabase "github.com/lengzuo/supa"
)

type apiConfig struct {
	db *supabase.Client
}

// type apiConfig struct {
// 	db               database.Client
// 	jwtSecret        string
// 	platform         string
// 	filepathRoot     string
// 	assetsRoot       string
// 	s3Bucket         string
// 	s3Region         string
// 	s3CfDistribution string
// 	port             string
// 	s3client         *s3.Client
// }

// type thumbnail struct {
// 	data      []byte
// 	mediaType string
// }

// var videoThumbnails = map[uuid.UUID]thumbnail{}

func main() {
	godotenv.Load(".env")

	supabaseApiKey := os.Getenv("SUPA_API_KEY")
	if supabaseApiKey == "" {
		log.Fatal("error getting API key")
	}
	supabaseUrl := os.Getenv("SUPA_URL")
	if supabaseApiKey == "" {
		log.Fatal("error getting supabase URL")
	}
	port := os.Getenv("PORT")
	if supabaseApiKey == "" {
		log.Fatal("error getting port number")
	}

	supabaseConf := supabase.Config{
		ApiKey:     supabaseApiKey,
		ProjectRef: supabaseUrl,
		Debug:      true,
	}

	client, err := supabase.New(supabaseConf)
	if err != nil {
		log.Fatalf("error getting supabase client")
	}

	cfg := apiConfig{
		db: client,
	}

	if err != nil {
		log.Fatalf("error occured: %v", err)
		return
	}

	mux := http.NewServeMux()
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}
	log.Printf("Serving on: http://localhost:%s/app/\n", port)
	log.Fatal(srv.ListenAndServe())

	mux.HandleFunc("GET /api/summary", cfg.GetStockSummary)
}

func (cfg *apiConfig) GetStockSummary(w http.ResponseWriter, r *http.Request) {

}
