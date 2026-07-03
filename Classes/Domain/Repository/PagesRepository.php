<?php

declare(strict_types=1);

namespace Wegewerk\Ai3Quickmeta\Domain\Repository;

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\Query\Restriction\DefaultRestrictionContainer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class PagesRepository extends \Wegewerk\Ai3Core\Domain\Repository\PagesRepository
{
    public function getPageRow(int $pageId): array {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable('pages');
        $queryBuilder->select('*')
            ->from('pages')
            ->where($queryBuilder->expr()
                ->eq('uid', $queryBuilder->createNamedParameter($pageId, Connection::PARAM_INT)));
        return $queryBuilder->executeQuery()
            ->fetchAssociative();
    }
}
