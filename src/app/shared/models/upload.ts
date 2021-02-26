export class Upload {
    $key: string;
    file: File;
    name: string="";
    alt: string="";
    url: string;
    createdDate: Date = new Date();
    
    constructor(file?: File){
        this.file = file;
    }
}
