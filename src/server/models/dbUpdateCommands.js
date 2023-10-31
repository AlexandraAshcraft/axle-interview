`CREATE TABLE patients (
    patient_id varchar NOT NULL, 
    first_name varchar NOT NULL, 
    last_name varchar NOT NULL, 
    date_of_birth date NOT NULL, 
    street_address varchar NOT NULL, 
    city varchar NOT NULL, 
    state varchar NOT NULL, 
    zipcode int NOT NULL, 
    phone int NOT NULL, 
    insurance_provider varchar NOT NULL, 
    PRIMARY KEY (patient_id));
);`;

`CREATE TABLE providers (
    provider_id varchar NOT NULL, 
    first_name varchar NOT NULL, 
    last_name varchar NOT NULL, 
    specialty varchar NOT NULL,
    street_address varchar NOT NULL, 
    city varchar NOT NULL, 
    state varchar NOT NULL, 
    zipcode int NOT NULL, 
    phone int NOT NULL, 
    PRIMARY KEY (provider_id));
);`;

`CREATE TABLE appointments (
    appointment_id varchar NOT NULL,
    patient_id varchar NOT NULL references patients(patient_id),
    provider_id varchar NOT NUL references providers(provider_id), 
    date date NOT NULL, 
    start_time time NOT NULL, 
    end_time time NOT NULL, 
    type varchar NOT NULL,
    status varchar NOT NULL, 
    PRIMARY KEY (appointment_id));
);`;

`ALTER TABLE table_name (
    RENAME TO new_table_name,
    ADD column_name datatype,
    DROP COLUMN column_name,
    RENAME COLUMN old_name to new_name,
    ALTER COLUMN column_name TYPE datatype,
);`;
