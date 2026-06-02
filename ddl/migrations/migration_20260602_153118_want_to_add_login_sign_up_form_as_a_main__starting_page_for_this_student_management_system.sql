-- Table for want to add login/ sign up form as a main  starting page for this student management system.
CREATE TABLE IF NOT EXISTS want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_update_want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system_timestamp ON want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system;
CREATE TRIGGER trigger_update_want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system_timestamp
    BEFORE UPDATE ON want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system
    FOR EACH ROW EXECUTE FUNCTION update_want_to_add_login_sign_up_form_as_a_main__starting_page_for_this_student_management_system_timestamp();