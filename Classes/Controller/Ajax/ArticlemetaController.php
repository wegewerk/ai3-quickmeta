<?php

declare(strict_types=1);

namespace Wegewerk\Ai3Quickmeta\Controller\Ajax;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Resource\StorageRepository;
use Wegewerk\Ai3Quickmeta\Domain\Repository\PagesRepository;
use Wegewerk\Ai3Core\Controller\Ajax\AbstractAjaxController;
use Wegewerk\Ai3Quickmeta\Domain\Capabilities\ArticlemetaCapability;

#[AsController]
class ArticlemetaController extends AbstractAjaxController
{
    public function __construct(
        LoggerInterface                $logger,
        private readonly PagesRepository $pagesRepository,
        private ArticlemetaCapability  $articlemetaCapability,
        protected StorageRepository    $storageRepository
    ) {
        parent::__construct($logger);
    }

    public function fetchPageRow(ServerRequestInterface $request): ResponseInterface {
        try {
            $pageId = (int)$request->getQueryParams()['page_id'];

            if ($pageId <= 0) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'Invalid page ID' ]);
            }
            $row = $this->pagesRepository->getPageRow($pageId);
            $content = $this->pagesRepository->getPageContent($pageId);

            if (empty($row)) {
                return $this->createJsonErrorResponse(new Response(),
                    [ 'error' => 'No row found for page ' . $pageId ]);
            }

            return $this->createJsonSuccessResponse(new Response(),
                [
                    'pageData'   => $row,
                    'hasContent' => !empty($content),
                ]);
        } catch (\Exception $e) {
            $this->logger->error('Error fetching Page: ' . $e->getMessage());
            return $this->createJsonErrorResponse(new Response(), [ 'error' => $e->getMessage() ]);
        }
    }

    public function getArticlemetatsuggestion(ServerRequestInterface $request): ResponseInterface {
        try {
            $pageId = (int)$request->getQueryParams()['page_id'];

            if ($pageId <= 0) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'Invalid page ID' ]);
            }
            $content = $this->pagesRepository->getPageContent($pageId);

            if (empty($content)) {
                return $this->createJsonErrorResponse(new Response(), [ 'error' => 'No content found on page' ]);
            }

            $suggestion = $this->articlemetaCapability->endpoint->generate(
                '',
                $content,
                'de');
            if (is_string($suggestion)) {
                $suggestion = json_decode($suggestion, true, 512, JSON_THROW_ON_ERROR);
            }


            if (empty($suggestion)) {
                return $this->createJsonErrorResponse(new Response(),
                    [ 'error' => 'Error: Suggestion was empty for Page ' . $pageId ]);
            }

            return $this->createJsonSuccessResponse(new Response(),
                [
                    'suggestion' => $suggestion,
                ]);
        } catch (\Exception $e) {
            $this->logger->error('Error generating Metadata: ' . $e->getMessage());
            return $this->createJsonErrorResponse(new Response(), [ 'error' => $e->getMessage() ]);
        }
    }

}
