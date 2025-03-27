/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require a comment before each variable declaration",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingComment: "Variable '{{ name }}' must have a preceding comment.",
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const targetFiles = options.files || []; //list of files to check
    return {
      VariableDeclaration(node) {
        const filename = context.filename;
        const fn = filename.split('\\').pop();
        if (targetFiles.length > 0 && !targetFiles.includes(fn)) {
          return;
        }
          console.log("custom rule executed for: " + filename);
          node.declarations.forEach((declaration) => {
            if (declaration.id.type === "Identifier") {
              const sourceCode = context.sourceCode;
              const comments = sourceCode.getCommentsBefore(node);
  
              if (!comments.length) {
                context.report({
                  node: declaration,
                  messageId: "missingComment",
                  data: { name: declaration.id.name },
                });
              }
            }
          });
        return;
      },
    };
  },
};
