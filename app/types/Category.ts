export interface Property {
    name: string;
    values:  string ;
  }
  


export interface Category {
    _id: string;
    name: string;
    parent?: { _id: string; name: string };
    properties: Property[];
  }