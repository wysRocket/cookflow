-- Better Auth MySQL schema for CookFlow
-- Run this in Hostinger phpMyAdmin or mysql CLI on the server:
--   mysql -u cookflow_user -p cookflow < scripts/migrate-mysql.sql

CREATE TABLE IF NOT EXISTS `user` (
  `id`            VARCHAR(36)   NOT NULL,
  `name`          VARCHAR(255)  NOT NULL,
  `email`         VARCHAR(255)  NOT NULL,
  `emailVerified` TINYINT(1)    NOT NULL DEFAULT 0,
  `image`         VARCHAR(255)  NULL,
  `createdAt`     DATETIME      NOT NULL,
  `updatedAt`     DATETIME      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `session` (
  `id`          VARCHAR(36)   NOT NULL,
  `expiresAt`   DATETIME      NOT NULL,
  `token`       VARCHAR(255)  NOT NULL,
  `createdAt`   DATETIME      NOT NULL,
  `updatedAt`   DATETIME      NOT NULL,
  `ipAddress`   VARCHAR(255)  NULL,
  `userAgent`   VARCHAR(512)  NULL,
  `userId`      VARCHAR(36)   NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_session_token` (`token`),
  KEY `idx_session_userId` (`userId`),
  CONSTRAINT `fk_session_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `account` (
  `id`                     VARCHAR(36)   NOT NULL,
  `accountId`              VARCHAR(255)  NOT NULL,
  `providerId`             VARCHAR(255)  NOT NULL,
  `userId`                 VARCHAR(36)   NOT NULL,
  `accessToken`            TEXT          NULL,
  `refreshToken`           TEXT          NULL,
  `idToken`                TEXT          NULL,
  `accessTokenExpiresAt`   DATETIME      NULL,
  `refreshTokenExpiresAt`  DATETIME      NULL,
  `scope`                  VARCHAR(255)  NULL,
  `password`               TEXT          NULL,
  `createdAt`              DATETIME      NOT NULL,
  `updatedAt`              DATETIME      NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_account_userId` (`userId`),
  CONSTRAINT `fk_account_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `verification` (
  `id`          VARCHAR(36)   NOT NULL,
  `identifier`  VARCHAR(255)  NOT NULL,
  `value`       TEXT          NOT NULL,
  `expiresAt`   DATETIME      NOT NULL,
  `createdAt`   DATETIME      NULL,
  `updatedAt`   DATETIME      NULL,
  PRIMARY KEY (`id`),
  KEY `idx_verification_identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
