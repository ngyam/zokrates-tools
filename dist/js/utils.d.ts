interface BasicInput {
    name: string;
    filepath: string;
}
export declare function extractName(argv: BasicInput): string;
export declare function execCmd(command: string): Promise<void>;
export {};
