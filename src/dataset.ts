// export type FieldData = string | number | Date | null;

// export type FieldDataType =
//   | "string"
//   | "integer"
//   | "float"
//   | "date"
//   | "time"
//   | "datetime";

// export type FieldBuffer = string[] | Int32Array | Float64Array | Date[];

// export interface FieldInfo {
//   readonly name: string;
//   readonly dataType: FieldDataType;
//   readonly isRequired: boolean;
//   readonly minValue?: number;
//   readonly maxValue?: number;
//   readonly sum?: number;
//   readonly mean?: number;
//   readonly variants: Set<FieldData>;
// }

// class Dataset {
//   private _fieldsInfos: FieldInfo[];
//   private _fieldsData: FieldBuffer[];

//   get fields() {
//     return this._fieldsInfos;
//   }

//   sliceData(start: number, end: number) {}

//   addField(info: FieldInfo) {}

//   moveField(index: number, newIndex: number) {}

//   removeField(index: number) {}

//   addRow(values: any[]) {}

//   removeRow(values: any[]) {}
// }
