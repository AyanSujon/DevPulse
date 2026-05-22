import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.connectionString || "",
})



// Function to initialize the database and create the users table if it doesn't exist
export const initDB = async() => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor'
        CHECK (role IN ('contributor', 'maintainer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )`)
        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initializing database:", error)
    }
}


// Function to initialize the issues table
export const initIssuesDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,

        title VARCHAR(150) NOT NULL,

        description TEXT NOT NULL
          CHECK (char_length(description) >= 20),

        type VARCHAR(20) NOT NULL
          CHECK (type IN ('bug', 'feature_request')),

        status VARCHAR(20) DEFAULT 'open'
          CHECK (status IN ('open', 'in_progress', 'resolved')),

        reporter_id INTEGER NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("Issues table initialized successfully")
  } catch (error) {
    console.error("Error initializing issues table:", error)
  }
}

