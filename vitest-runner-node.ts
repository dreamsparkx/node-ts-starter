import { VitestTestRunner } from 'vitest/runners';

export default class ViteRunner extends VitestTestRunner {
    importFile(path, source) {
        function prepareContext(context) {
            context.module.filename = context.__filename;
            context.require.main = {};
            return context;
        }
        const proto = Object.getPrototypeOf(this.__vitest_executor);
        proto.prepareContext = prepareContext;
        return super.importFile(path, source);
    }
}