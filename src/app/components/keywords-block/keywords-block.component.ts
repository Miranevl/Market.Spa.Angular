import { Component } from '@angular/core';

@Component({
  selector: 'app-keywords-block',
  templateUrl: './keywords-block.component.html',
})
export class KeywordsBlockComponent {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }
}
