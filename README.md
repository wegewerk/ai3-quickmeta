# Ai3 Quickmeta

**Ai3 Quickmeta** (`ai3_quickmeta`) is the Metadata Assistent capability
of the *Ai3 Suite*. It provides an assistant for generating page metadata
(title, description, keywords, SEO/Opengraph).

## Features

- **AI-Generated Metadata**: Automatically generate page titles and descriptions based on page content.
- **FormEngine Integration**: Seamlessly integrated into the TYPO3 page properties.
- **Multi-language Support**: Works across different languages supported by your TYPO3 installation and AI3 Suite.

## Requirements

| Dependency | Version |
|---|---|
| TYPO3 CMS | `^13.4.0 \| ^14.0` |
| `wegewerk/ai3_core` | `@dev` |

## Installation

```bash
composer require wegewerk/ai3_quickmeta
```

`wegewerk/ai3_core` is pulled in automatically as a Composer dependency.

## Quick start

1. Set the ZAK-AI credentials as environment variables:

   ```bash
   export ZAKAI_API_KEY=<your-api-key>
   export ZAKAI_SECRET=<your-secret>
   ```

## Configuration

This Extension does not provide any configuration settings. Configure the ZAK-AI credentials via environment variables.
See ai3_core

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
