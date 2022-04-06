CREATE DATABASE IF NOT EXISTS welcomp_apps;

USE welcomp_apps;

CREATE TABLE IF NOT EXISTS due_factures
(
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  facture_number BIGINT(30)   NOT NULL,
  due_date       DATETIME     NOT NULL,
  sold           BIGINT(30)   NOT NULL,
  paid_status    VARCHAR(255),
  iban           VARCHAR(255) NOT NULL,
  created_at     DATETIME,
  modified_at    DATETIME

);
