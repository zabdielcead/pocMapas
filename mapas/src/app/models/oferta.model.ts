export class Registro {
    public lat: number;
    public lng: number;
    public typeOferta: string;
    public descOferta: string;
    public idOferta: string;
    public provedorOferta: string;
    public fechaExpira: Date;
    public fechaCreacion: Date;

    constructor(lat: number,
                lng: number,
                typeOferta: string,
                descOferta: string,
                idOferta: string,
                provedorOferta: string,
                fechaExpira: Date
                ) {
        this.lat  = lat;
        this.lng  = lng;
        this.typeOferta  = typeOferta;
        this.descOferta  = descOferta;
        this.idOferta  = idOferta;
        this.provedorOferta  = provedorOferta;
        this.fechaExpira = fechaExpira;
        this.fechaCreacion = new Date();
      //   this.determinarTipo();
    }

}