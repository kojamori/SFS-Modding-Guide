# Style Guide

This style guide provides guidelines and best practices for writing and formatting content in the SFS Modding Guide. Following these standards will help ensure consistency, clarity, and professionalism across all documentation.

## General Writing Guidelines

- **Clarity**: Write clearly and concisely. Avoid jargon unless necessary, and explain any technical terms that may not be familiar to all readers.
- **Tone**: Maintain a professional and approachable tone. Aim to be helpful and informative.
- **Consistency**: Use consistent terminology and formatting throughout the documentation. Refer to the same concept with the same term each time.

## Formatting Guidelines

- **Headings**: Use headings to organize content into sections. Follow a hierarchical structure (e.g., H1 for the main title, H2 for sections, H3 for subsections).
  - Only use H1 for the main title of the document. This is because any other H1 headings will not be included in the table of contents on the right side of the page.
  - When necessary, you can override the default page title in the frontmatter using the `title` field, such as when dealing with nested types in API documentation.
- **Lists**: Use bullet points for unordered lists and numbers for ordered lists. Keep list items concise.
- **Code Blocks**: Use fenced code blocks (triple backticks) for code snippets. Specify the language for syntax highlighting when applicable.
- **Links**: Use descriptive link text that clearly indicates the destination. Avoid using "click
  here" or similar phrases.
- **Images**: Include alt text for all images to improve accessibility. Ensure images are relevant and enhance the content. Use the `Figure` component in .mdx files, as it provides the following benefits:

  - Width control for sizing images appropriately via `widthpercent` prop.
  - Built-in support for captions, e.g. `<Figure caption="An example image" widthpercent="50">`.
  - Support for alt text via the `alt` prop.
  - Image setting using `src` prop.
  - Example usage:

    ```mdx
    import Figure from "@site/src/components/Figure";

    <Figure
      caption="An example image"
      widthpercent="50"
      alt="Description of the image"
      src="/path/to/image.png"
    />
    ```

## Markdown Best Practices

- **Line Length**: Keep lines to a maximum of 80 characters for better readability in various editors.\
- **Whitespace**: Use blank lines to separate paragraphs and sections for better readability.
- **Emphasis**: Use bold for strong emphasis and italics for mild emphasis. Avoid overusing emphasis.
- **Tables**: Use tables for structured data. Ensure tables are well-formatted and easy to read.

## Review and Editing

- **Proofreading**: Always proofread your content for grammar, spelling, and punctuation errors before submission.
- **Peer Review**: Whenever possible, have another contributor review your content for clarity and accuracy.
- **Updates**: Regularly review and update existing content to ensure it remains accurate and relevant.
- **Version Control**: Use version control practices when making significant changes to documentation, including clear commit messages that describe the changes made.
- **Citations**: When referencing external sources, provide proper citations and links to the original material.
- **Accessibility**: Ensure that your content is accessible to all users, including those using screen readers. Use semantic HTML elements where applicable.
- **Localization**: If the documentation is to be translated into other languages, avoid using idiomatic expressions that may not translate well.
- **Templates**: Use predefined templates for common document types to maintain consistency in structure and formatting.
- **Docusaurus Frontmatter**: Typically we want to keep frontmatter minimal. The only required field is `title`. Optional fields include `description`. Slug should not be used unless there is a specific reason to override the default URL path.

## API Documentation Guidelines

TBD. See [API Documentation Pipeline](internal/api-documentation-pipeline) for more information.
