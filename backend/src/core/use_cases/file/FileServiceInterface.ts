interface FileServiceInterface {
    uploadFile(file: any): Promise<string>;
}

export default FileServiceInterface;
