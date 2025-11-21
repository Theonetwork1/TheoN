/*
  # Create Theo_email table for email subscriptions

  1. New Tables
    - `Theo_email`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `source` (text) - tracks where the email came from (e.g., 'homepage-form')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `Theo_email` table
    - Add policy for anonymous users to insert emails
    - Add policy for authenticated users to view all emails
*/

CREATE TABLE IF NOT EXISTS Theo_email (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'homepage-form',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE Theo_email ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to insert emails"
  ON Theo_email
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view emails"
  ON Theo_email
  FOR SELECT
  TO authenticated
  USING (true);