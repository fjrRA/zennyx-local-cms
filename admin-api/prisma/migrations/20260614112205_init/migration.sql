-- CreateTable
CREATE TABLE `SiteConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(160) NOT NULL,
    `shortName` VARCHAR(80) NOT NULL,
    `type` VARCHAR(120) NOT NULL,
    `stage` VARCHAR(160) NOT NULL,
    `country` VARCHAR(80) NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `siteUrl` VARCHAR(255) NOT NULL,
    `tagline` JSON NOT NULL,
    `positioning` JSON NOT NULL,
    `description` JSON NOT NULL,
    `coreMessage` JSON NOT NULL,
    `studioPrinciples` JSON NOT NULL,
    `toneOfVoice` JSON NOT NULL,
    `home` JSON NOT NULL,
    `about` JSON NOT NULL,
    `footer` JSON NOT NULL,
    `seo` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `slug` VARCHAR(140) NOT NULL,
    `status` VARCHAR(120) NOT NULL,
    `productionType` VARCHAR(160) NOT NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `order` INTEGER NOT NULL DEFAULT 0,
    `summary` TEXT NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `genre` JSON NOT NULL,
    `theme` JSON NOT NULL,
    `setting` JSON NOT NULL,
    `platforms` JSON NOT NULL,
    `targetBuild` VARCHAR(120) NOT NULL,
    `targetRelease` VARCHAR(120) NOT NULL,
    `developmentStage` JSON NOT NULL,
    `gameplayFocus` JSON NOT NULL,
    `prototypeScope` JSON NOT NULL,
    `deferredFeatures` JSON NOT NULL,
    `media` JSON NOT NULL,
    `links` JSON NOT NULL,
    `relatedDevlogs` JSON NOT NULL,
    `seo` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Game_slug_key`(`slug`),
    INDEX `Game_isFeatured_idx`(`isFeatured`),
    INDEX `Game_isPublic_idx`(`isPublic`),
    INDEX `Game_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `slug` VARCHAR(140) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `category` ENUM('Studio', 'Development', 'Production', 'Design', 'Prototype', 'Milestone', 'Reflection', 'Technical') NOT NULL,
    `summary` TEXT NOT NULL,
    `relatedGame` VARCHAR(140) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `content` TEXT NOT NULL,
    `gameId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Devlog_slug_key`(`slug`),
    INDEX `Devlog_date_idx`(`date`),
    INDEX `Devlog_category_idx`(`category`),
    INDEX `Devlog_isFeatured_idx`(`isFeatured`),
    INDEX `Devlog_isPublished_idx`(`isPublished`),
    INDEX `Devlog_relatedGame_idx`(`relatedGame`),
    INDEX `Devlog_gameId_idx`(`gameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `role` VARCHAR(120) NOT NULL,
    `displayRole` VARCHAR(180) NOT NULL,
    `location` VARCHAR(120) NULL,
    `avatar` VARCHAR(255) NULL,
    `shortBio` TEXT NOT NULL,
    `bio` TEXT NOT NULL,
    `responsibilities` JSON NOT NULL,
    `socials` JSON NOT NULL,
    `isFounder` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TeamMember_slug_key`(`slug`),
    INDEX `TeamMember_isFounder_idx`(`isFounder`),
    INDEX `TeamMember_isActive_idx`(`isActive`),
    INDEX `TeamMember_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primaryContact` JSON NOT NULL,
    `contactMessage` JSON NOT NULL,
    `links` JSON NOT NULL,
    `cta` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(255) NOT NULL,
    `originalName` VARCHAR(255) NULL,
    `altText` VARCHAR(255) NULL,
    `caption` VARCHAR(255) NULL,
    `mediaType` ENUM('IMAGE', 'GIF', 'VIDEO', 'AUDIO', 'DOCUMENT', 'OTHER') NOT NULL DEFAULT 'IMAGE',
    `sourcePath` VARCHAR(500) NULL,
    `publicPath` VARCHAR(500) NOT NULL,
    `gameId` INTEGER NULL,
    `devlogId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MediaAsset_mediaType_idx`(`mediaType`),
    INDEX `MediaAsset_gameId_idx`(`gameId`),
    INDEX `MediaAsset_devlogId_idx`(`devlogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Devlog` ADD CONSTRAINT `Devlog_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaAsset` ADD CONSTRAINT `MediaAsset_devlogId_fkey` FOREIGN KEY (`devlogId`) REFERENCES `Devlog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
