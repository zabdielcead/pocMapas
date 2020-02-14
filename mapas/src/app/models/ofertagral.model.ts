export class OfertaGeneral {
    public titulo: string;
    public descripcion: string;
    public telefono: string;
    public img: string;
    public fechaCreacion: Date;
    

    constructor(titulo,
                descripcion,
                telefono,
                img,
                ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.telefono = telefono;
        this.img = img;
        this.fechaCreacion = new Date();
      //   this.determinarTipo();
    }

}