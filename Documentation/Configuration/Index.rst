.. include:: /Includes.rst.txt

.. _configuration:

=============
Configuration
=============

.. _configuration-ai3-core:

--------
Ai3 Core
--------

Ai3 Quickmeta relies on the configuration of **Ai3 Core**. Ensure that Ai3 Core
is properly configured with a valid API key and secret for the Zak-AI service.

.. _configuration-api-credentials:

---------------
API Credentials
---------------

The API credentials for the Zak-AI service are typically provided via environment
variables:

*   `ZAKAI_API_KEY`: Your Zak-AI API key.
*   `ZAKAI_SECRET`: Your Zak-AI secret.

These are consumed by `Wegewerk\Ai3Core\Api\ZakAiClient`.

.. _configuration-ts-config:

