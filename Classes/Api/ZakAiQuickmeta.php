<?php

namespace Wegewerk\Ai3Quickmeta\Api;

use Wegewerk\Ai3Core\Api\AbstractZakAiEndpoint;

/**
 * Implements the API Endpoint related to article metadata generation
 */
class ZakAiQuickmeta extends AbstractZakAiEndpoint
{
    protected string $endpoint = 'articlemeta';
    protected string $responseKey = 'articlemeta';
    protected array $requiredOptions = ['text'];
    protected array $optionalOptions = ['language'];
}
