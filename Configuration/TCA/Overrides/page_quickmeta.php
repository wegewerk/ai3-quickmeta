<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die();

$GLOBALS['TCA']['pages']['columns']['tx_ai3_quickmeta'] = [
    'exclude' => false,
    'label' => 'LLL:EXT:ai3_quickmeta/Resources/Private/Language/locallang.xlf:tx_ai3.quickmeta.elementLabel',
    'config' => [
        'type' => 'none',
        'renderType' => 'ai3QuickmetaElement',
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages',
    '--div--;LLL:EXT:ai3_quickmeta/Resources/Private/Language/locallang.xlf:tx_ai3.quickmeta.page.tabLabel,
        tx_ai3_quickmeta;
','','before:--div--;core.form.tabs:metadata');

