export abstract class BasePage {
    protected defaultLanguage: string = 'lv-LV';

    protected constructor() {}

    protected typeText(element: any, text: string): void {
        element.clear().type(text).type('{enter}');
    }
}
