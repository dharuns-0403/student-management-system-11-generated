-- Table for want to add text "Heloo" in the header
CREATE TABLE IF NOT EXISTS want_to_add_text_heloo_in_the_header (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_want_to_add_text_heloo_in_the_header_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_update_want_to_add_text_heloo_in_the_header_timestamp ON want_to_add_text_heloo_in_the_header;
CREATE TRIGGER trigger_update_want_to_add_text_heloo_in_the_header_timestamp
    BEFORE UPDATE ON want_to_add_text_heloo_in_the_header
    FOR EACH ROW EXECUTE FUNCTION update_want_to_add_text_heloo_in_the_header_timestamp();