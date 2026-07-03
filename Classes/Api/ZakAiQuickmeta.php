<?php

namespace Wegewerk\Ai3Quickmeta\Api;

use Wegewerk\Ai3Core\Api\ZakAiClient;
use Wegewerk\Ai3Core\Api\ZakAiEndpointInterface;

/**
 * Implemets the API Endpoint related to a alt text generation
 */
class ZakAiQuickmeta implements ZakAiEndpointInterface
{
    public function __construct(private ZakAiClient $client) {}

    public function generate(string $imagePath, string $description, string $language): string
    {
        $response = $this->client->postJson(
            'articlemeta',
            [
                'text'     => $description,
                'language' => $language ?? 'de',
            ]
        );
        $generatedMetadata = $response['articlemeta'] ?? [];
        return $generatedMetadata;
    }

}
