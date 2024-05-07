DROP DATABASE IF EXISTS `mydb`;

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`pole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole` (
  `pole_id` INT NOT NULL,
  `pole_stencil` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pole_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`line`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`line` (
  `line_id` INT NOT NULL,
  `line_number` INT NOT NULL,
  `line_name` VARCHAR(80) NOT NULL,
  `line_abbreviation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`line_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`drawings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`drawings` (
  `drawing_id` INT NOT NULL,
  `drawing_name` VARCHAR(45) NOT NULL,
  `drawing_title` VARCHAR(150) NOT NULL,
  `revision_number` VARCHAR(45) NOT NULL,
  `revision_date` DATE NOT NULL,
  `line_id` INT NOT NULL,
  PRIMARY KEY (`drawing_id`, `line_id`),
  INDEX `fk_drawings_line_idx` (`line_id` ASC) VISIBLE,
  CONSTRAINT `fk_drawings_line`
    FOREIGN KEY (`line_id`)
    REFERENCES `mydb`.`line` (`line_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pole_drawings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole_drawings` (
  `pole_drawings_id` INT NOT NULL,
  `pole_id` INT NOT NULL,
  `drawing_id` INT NOT NULL,
  INDEX `fk_pole_has_drawings_drawings1_idx` (`drawing_id` ASC) VISIBLE,
  INDEX `fk_pole_has_drawings_pole1_idx` (`pole_id` ASC) VISIBLE,
  PRIMARY KEY (`pole_drawings_id`),
  CONSTRAINT `fk_pole_has_drawings_pole1`
    FOREIGN KEY (`pole_id`)
    REFERENCES `mydb`.`pole` (`pole_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pole_has_drawings_drawings1`
    FOREIGN KEY (`drawing_id`)
    REFERENCES `mydb`.`drawings` (`drawing_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`pole_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole_details` (
  `pole_detail_id` INT NOT NULL,
  `pole_stencil` VARCHAR(20) NULL,
  `pole_location_id` INT NOT NULL,
  `line_number` SMALLINT NOT NULL,
  `height` INT NOT NULL,
  `pole_class` VARCHAR(10) NULL,
  `type_description` VARCHAR(50) NULL,
  `construction_assembly` VARCHAR(15) NULL,
  `phase_configuration` VARCHAR(6) NULL,
  `manufacturer_date` DATE NULL,
  `pole_material` VARCHAR(45) NULL,
  `install_date` DATE NULL,
  `pud_owned` TINYINT NULL,
  `joint_presence` TINYINT NULL,
  `catv_presence` TINYINT NULL,
  `fiber_presence` TINYINT NULL,
  `tel_presence` TINYINT NULL,
  `cell_presence` TINYINT NULL,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  PRIMARY KEY (`pole_detail_id`),
  UNIQUE INDEX `pole_detail_id_UNIQUE` (`pole_detail_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- --------------------------------------------------------------- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`pole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole` (
  `pole_id` INT NOT NULL,
  `pole_stencil` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pole_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`line`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`line` (
  `line_id` INT NOT NULL,
  `line_number` INT NOT NULL,
  `line_name` VARCHAR(45) NOT NULL,
  `line_abbreviation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`line_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`drawings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`drawings` (
  `drawing_id` INT NOT NULL,
  `drawing_name` VARCHAR(45) NOT NULL,
  `drawing_title` VARCHAR(45) NOT NULL,
  `revision_number` VARCHAR(45) NOT NULL,
  `revision_date` DATETIME NOT NULL,
  `line_id` INT NOT NULL,
  PRIMARY KEY (`drawing_id`, `line_id`),
  INDEX `fk_drawings_line_idx` (`line_id` ASC) VISIBLE,
  CONSTRAINT `fk_drawings_line`
    FOREIGN KEY (`line_id`)
    REFERENCES `mydb`.`line` (`line_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pole_drawings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole_drawings` (
  `pole_drawings_id` INT NOT NULL,
  `pole_id` INT NOT NULL,
  `drawing_id` INT NOT NULL,
  INDEX `fk_pole_has_drawings_drawings1_idx` (`drawing_id` ASC) VISIBLE,
  INDEX `fk_pole_has_drawings_pole1_idx` (`pole_id` ASC) VISIBLE,
  PRIMARY KEY (`pole_drawings_id`),
  CONSTRAINT `fk_pole_has_drawings_pole1`
    FOREIGN KEY (`pole_id`)
    REFERENCES `mydb`.`pole` (`pole_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pole_has_drawings_drawings1`
    FOREIGN KEY (`drawing_id`)
    REFERENCES `mydb`.`drawings` (`drawing_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pole_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pole_details` (
  `pole_detail_id` INT NOT NULL,
  `pole_stencil` VARCHAR(20) NULL,
  `pole_location_id` INT NOT NULL,
  `line_number` SMALLINT NOT NULL,
  `height` INT NOT NULL,
  `pole_class` VARCHAR(10) NULL,
  `type_description` VARCHAR(50) NULL,
  `construction_assembly` VARCHAR(15) NULL,
  `phase_configuration` INT NULL,
  `manufacturer_date` DATE NULL,
  `pole_material` VARCHAR(45) NULL,
  `install_date` DATE NULL,
  `pud_owned` TINYINT NULL,
  `joint_presence` TINYINT NULL,
  `catv_presence` TINYINT NULL,
  `fiber_presence` TINYINT NULL,
  `tel_presence` TINYINT NULL,
  `cell_presence` TINYINT NULL,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  UNIQUE INDEX `pole_stencil_UNIQUE` (`pole_stencil` ASC) VISIBLE,
  PRIMARY KEY (`pole_detail_id`),
  UNIQUE INDEX `pole_detail_id_UNIQUE` (`pole_detail_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- ------------------------------------------------
-- ------------------------------------------------
-- ------------------------------------------------

-- -----------------------------------------------------
-- Table `mydb`.`logging`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`logging` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NOT NULL,
  `action` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`log_id`),
  UNIQUE INDEX `id_UNIQUE` (`log_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_first_name` VARCHAR(45) NOT NULL,
  `user_last_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(70) NOT NULL,
  `pass_salt` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_logging`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_logging` (
  `log_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`log_id`, `user_id`),
  INDEX `fk_logging_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_logging_has_user_logging1_idx` (`log_id` ASC) VISIBLE,
  CONSTRAINT `fk_logging_has_user_logging1`
    FOREIGN KEY (`log_id`)
    REFERENCES `mydb`.`logging` (`log_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logging_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`api_key`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`api_key` (
  `api_key_id` INT NOT NULL AUTO_INCREMENT,
  `key_value` VARCHAR(150) NOT NULL,
  `VALID` TINYINT NOT NULL,
  `permission` TINYINT NOT NULL,
  PRIMARY KEY (`api_key_id`),
  UNIQUE INDEX `api_key_id_UNIQUE` (`api_key_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_api_key`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_api_key` (
  `user_id` INT NOT NULL,
  `api_key_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `api_key_id`),
  INDEX `fk_user_key_api_key1_idx` (`api_key_id` ASC) VISIBLE,
  INDEX `fk_user_key_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_key_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_key_api_key1`
    FOREIGN KEY (`api_key_id`)
    REFERENCES `mydb`.`api_key` (`api_key_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
