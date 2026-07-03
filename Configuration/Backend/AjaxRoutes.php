<?php

use Wegewerk\Ai3\Controller\Ajax\CreditsController;

return [
    'ai3_articlemeta' => [
        'path' => '/ai3/articlemeta',
        'target' => \Wegewerk\Ai3Quickmeta\Controller\Ajax\ArticlemetaController::class . '::fetchPageRow'
    ],
    'ai3_articlemeta_suggestion' => [
        'path' => '/ai3/articlemetasuggestion',
        'target' => \Wegewerk\Ai3Quickmeta\Controller\Ajax\ArticlemetaController::class . '::getArticlemetatsuggestion'
    ],


];
