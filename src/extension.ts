import * as vscode from 'vscode';

const terminalEscapeCommandsRegex = /\x1b\[.{0,15}?m/g;

const activate = (context: vscode.ExtensionContext): void => {
  console.log('[strip-ansi-esc]: Extension activated!');

  const disposable = vscode.commands.registerCommand('strip-ansi-esc.strip', () => {
    const editor = vscode.window.activeTextEditor;
    const document = editor?.document;
    if (document) {
      console.log(
        `[strip-ansi-esc]: Cleaning escape characters from ${document.fileName}`,
      );

      const unsaved = document.isDirty;
      const untitled = document.isUntitled;
      const content = document.getText();

      console.log(`[strip-ansi-esc]: Document state`, {
        isDirty: unsaved,
        isUntitled: untitled,
      });

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(content.length - 1),
      );
      const cleaned = content.replace(terminalEscapeCommandsRegex, '');
      editor.edit(x => {
        x.replace(fullRange, cleaned);
      });
      // If the document was clean, overwrite it
      if (!unsaved && !untitled) {
        console.log('[strip-ansi-esc]: Overwriting document.');
        document.save();
      }
    }
  });

  context.subscriptions.push(disposable);
};

const deactivate = (): void => {
  console.log('[strip-ansi-esc]: Extension deactivated!');
};

export { activate, deactivate };
