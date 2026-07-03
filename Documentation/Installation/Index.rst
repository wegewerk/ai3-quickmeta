.. include:: /Includes.rst.txt

.. _installation:

============
Installation
============

.. _installation-composer:

--------
Composer
--------

The recommended way to install Ai3 Quickmeta is via Composer:

.. code-block:: bash
   :caption: Install via composer

   composer require wegewerk/ai3_quickmeta

.. _installation-dependencies:

------------
Dependencies
------------

Ai3 Quickmeta requires the following extensions:

*   **Ai3 Core (`ai3_core`)**: Provides central AI capabilities and configuration.
*   **TYPO3 CMS Core**: Version 13.4.0 or higher.

.. _installation-activation:

----------
Activation
----------

After installation, ensure the extension is activated via CLI:

.. code-block:: bash
   :caption: Activate extension via CLI

   ./vendor/bin/typo3 extension:setup
