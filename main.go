package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	supa "github.com/supabase-community/supabase-go"
)

type apiConfig struct {
	db *supa.Client
}

type TableInfo struct {
	TableName string `json:"table_name"`
}

// Inventory represents the structure of your 'inventory' table.
// The json tags correspond to the column names in the database.
type Inventory struct {
	ID            uuid.UUID `json:"id"`
	ItemName      string    `json:"item_name"`
	Category      string    `json:"category"`
	Unit          string    `json:"unit"`
	CurrentStock  float64   `json:"current_stock"`
	MinStockLevel float64   `json:"min_stock_level"`
	CostPerUnit   *float64  `json:"cost_per_unit,omitempty"` // Use a pointer for nullable fields
	CreatedBy     uuid.UUID `json:"created_by"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
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
	if supabaseUrl == "" {
		log.Fatal("error getting supabase URL")
	}
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("error getting port number")
	}

	// client := supa.CreateClient(supabaseUrl, supabaseApiKey)
	client, _ := supa.NewClient(supabaseUrl, supabaseApiKey, nil)
	cfg := apiConfig{
		db: client,
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/inventory/summary", cfg.GetStockSummary)
	mux.HandleFunc("POST /api/inventory", cfg.AddInventory)
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}
	log.Printf("Serving on: http://localhost:%s/app/\n", port)
	log.Fatal(srv.ListenAndServe())
}

func (cfg *apiConfig) GetStockSummary(w http.ResponseWriter, r *http.Request) {
	// var inventoryItems []Inventory
	// Fetch all columns from the 'inventory' table
	dat, _, err := cfg.db.From("inventory").Select("*", "exact", false).Execute()
	if err != nil {
		log.Printf("Error fetching inventory: %v", err)
		http.Error(w, "Failed to fetch inventory data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	fmt.Println(string(dat))
	// if err := json.NewEncoder(w).Encode(inventoryItems); err != nil {
	// 	log.Printf("Error encoding response: %v", err)
	// }
}

func (cfg *apiConfig) AddInventory(w http.ResponseWriter, r *http.Request) {
	var inv Inventory
	defer r.Body.Close()

	if err := json.NewDecoder(r.Body).Decode(&inv); err != nil {
		responedWithError(w, http.StatusBadRequest, "error decoding request", err)
	}
	_, _, err := cfg.db.From("inventory").Insert([]Inventory{inv}, true, "", "", "exact").Execute()
	if err != nil {
		responedWithError(w, http.StatusInternalServerError, "error adding record", err)
		return
	}
	respondWithJSON(w, http.StatusCreated, inv)

}

// func (cfg *apiConfig) GetTables(w http.ResponseWriter, r *http.Request) {
// 	var tables []TableInfo
// 	// Call the 'get_all_tables' PostgreSQL function we created.
// 	// The second argument is for count (we don't need it), and the third is for parameters (it takes none).
// 	err := cfg.db.Rpc("get_all_tables", "", nil, &tables)
// 	if err != nil {
// 		log.Printf("Error calling RPC function: %v", err)
// 		http.Error(w, "Failed to query database schema", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	if err := json.NewEncoder(w).Encode(tables); err != nil {
// 		log.Printf("Error encoding response: %v", err)
// 	}
// }
