export class Upload {
    id: string;
    file: File;
    name: string="";
    alt: string="";
    url: string;
    createdDate: Date = new Date();
    
    constructor( file?: File, id?: string, alt?: string, url?: string ){
        this.file = file;
        this.id = id;
        this.alt = alt
        this.url = url;
    }
}
