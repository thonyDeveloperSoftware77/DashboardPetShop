export interface responseApiProductos {
    data: {
        id: number,
        nombre: string,
        escripcion: string,
        precio: number,
    }[];
}

export interface responseApiClientes {
    data: {
        id: number,
        name: string,
        email: string,
        phoneNumber: string,
    }[];
}