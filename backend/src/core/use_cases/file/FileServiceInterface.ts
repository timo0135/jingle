interface FileServiceInterface {
    uploadFile(file: any): Promise<string>;
    uploadFileImage(file :any): Promise<string>;
}

export default FileServiceInterface;
