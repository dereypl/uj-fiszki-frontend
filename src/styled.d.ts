import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            [x: string]: string
        };
        fontWeight: {
            [x: string]: number
        };
        fontSize: {
            [x: string]: string
        }
    }
}