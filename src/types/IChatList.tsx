export interface Creator{
    id: number,
    name: string,
    email: string,
    phone: string,
    city: string
    country: Country
          
  }
 export interface Country{
    id: number, 
    name: string, 
    code: string, 
    phone_code: string
  }
  export interface Chat {
    id: number;
    name: string;
    creator:Creator
  }
  