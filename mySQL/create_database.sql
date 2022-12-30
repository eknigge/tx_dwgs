
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


