<?php

declare(strict_types=1);

namespace Wegewerk\Ai3Quickmeta\FormEngine;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;

class Ai3QuickmetaElement extends AbstractFormElement
{
    public function render(): array
    {
        $result = $this->initializeResultArray();
        $result['javaScriptModules'][] = JavaScriptModuleInstruction::create('@wegewerk/Ai3Quickmeta/quickmeta.js');

        $html = [
            '<div data-ai3="ai3-quickmeta-container"',
            ' data-page-id="' . (int)$this->data['databaseRow']['uid'] . '"',
            '>',
            '  <div data-ai3="ai3-quickmeta-app">',
            '  </div>',
            '</div>'
        ];

        $result['html'] = implode('', $html);
        return $result;
    }
}
