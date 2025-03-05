import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        runner: './vitest-runner-node.ts',
        include: ['./test/**/*.test.ts'],
        testTimeout: 100000,
        coverage: {
            provider: 'v8',
            reporter: ['lcov', 'json', 'text']
        }
    }
})