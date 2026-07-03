.. include:: /Includes.rst.txt

.. _developer:

=========
Developer
=========

.. _developer-php-api:

-------
PHP API
-------

ai3-quickmeta follows the capability pattern introduced by
:composer:`wegewerk/ai3_core`. The central pieces are:

.. php:class:: Wegewerk\Ai3Quickmeta\Api\ZakAiQuickmeta

   Implements the API endpoint for metadata generation.

   .. php:method:: generate(string $imagePath, string $description, string $language): array

      Sends a request to the Zak-AI service to generate metadata.

      :param string $imagePath: Not used in this implementation (can be empty).
      :param string $description: The content of the page to analyze.
      :param string $language: The target language for the metadata (default: 'de').
      :returntype: array
      :returns: An array containing the generated metadata fields.

.. _developer-ajax-endpoints:

--------------
Ajax Endpoints
--------------

Ai3 Quickmeta provides backend Ajax routes for its JavaScript application.

.. _developer-ajax-fetch-page-row:

`ai3_articlemeta`
=================

Fetches the current page row and checks if it has content.

*   **Path**: `/ai3/articlemeta`
*   **Method**: `GET`
*   **Parameters**:
    *   `page_id` (int): The UID of the page.

.. _developer-ajax-get-suggestion:

`ai3_articlemeta_suggestion`
============================

Generates metadata suggestions based on page content.

*   **Path**: `/ai3/articlemetasuggestion`
*   **Method**: `GET`
*   **Parameters**:
    *   `page_id` (int): The UID of the page.

.. _developer-formengine:

---------------------
FormEngine Integration
---------------------

The assistant is integrated via a custom FormEngine element:
`Wegewerk\Ai3Quickmeta\FormEngine\Ai3QuickmetaElement`.

It is added to the `pages` TCA via an override in
`Configuration/TCA/Overrides/page_quickmeta.php`.
