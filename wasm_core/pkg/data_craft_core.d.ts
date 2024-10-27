/* tslint:disable */
/* eslint-disable */
export function data_craft_init(): void;
export enum FieldAggregator {
  Count = 0,
  Min = 1,
  Max = 2,
  Sum = 3,
  Mean = 4,
}
export enum FieldType {
  Text = 0,
  Integer = 1,
  Float = 2,
  Date = 3,
  Time = 4,
  DateTime = 5,
}
export class Dataset {
  free(): void;
  /**
   * @param {Uint8Array} blob
   * @returns {Dataset}
   */
  static load_from_csv(blob: Uint8Array): Dataset;
  /**
   * @returns {(FieldInfo)[]}
   */
  fields(): (FieldInfo)[];
  /**
   * @param {FieldInfo} info
   */
  add_field(info: FieldInfo): void;
  /**
   * @param {number} index
   * @param {FieldInfo} info
   */
  update_field(index: number, info: FieldInfo): void;
  /**
   * @param {number} old_index
   * @param {number} new_index
   */
  swap_fields(old_index: number, new_index: number): void;
  /**
   * @param {number} index
   */
  remove_field(index: number): void;
  /**
   * @returns {number}
   */
  rows_count(): number;
  /**
   * @param {Array<any>} rows
   * @returns {Array<any>}
   */
  export_rows(rows: Array<any>): Array<any>;
  /**
   * @param {number} start
   * @param {number} end
   * @returns {Array<any>}
   */
  slice(start: number, end: number): Array<any>;
  /**
   * @param {Array<any>} indexes
   * @param {FieldAggregator} aggregator
   * @returns {any}
   */
  aggregate_rows(indexes: Array<any>, aggregator: FieldAggregator): any;
  /**
   * @param {number} group_field_index
   * @param {number} aggregate_field_index
   * @param {FieldAggregator} aggregator
   * @returns {Array<any>}
   */
  group_rows(group_field_index: number, aggregate_field_index: number, aggregator: FieldAggregator): Array<any>;
  /**
   * @param {number} field_index
   * @param {number} max_count
   * @returns {Array<any> | undefined}
   */
  distinct_values(field_index: number, max_count: number): Array<any> | undefined;
  /**
   * @param {(FieldFilter)[]} filters
   * @returns {Dataset}
   */
  filter_values(filters: (FieldFilter)[]): Dataset;
  /**
   * @param {Array<any>} data
   */
  add_row(data: Array<any>): void;
  /**
   * @param {number} index
   * @param {Array<any>} data
   */
  update_row(index: number, data: Array<any>): void;
  /**
   * @param {number} old_index
   * @param {number} new_index
   */
  swap_rows(old_index: number, new_index: number): void;
  /**
   * @param {Array<any>} indexes
   */
  remove_rows(indexes: Array<any>): void;
}
export class FieldFilter {
  free(): void;
  /**
   * @param {number | undefined} min_value
   * @param {number | undefined} max_value
   * @param {(string)[]} values
   * @param {string} pattern
   */
  constructor(min_value: number | undefined, max_value: number | undefined, values: (string)[], pattern: string);
  max_value?: number;
  min_value?: number;
  pattern: string;
  values: (string)[];
}
export class FieldInfo {
  free(): void;
  /**
   * @param {string} name
   * @param {FieldType} date_type
   * @param {boolean} is_required
   * @returns {FieldInfo}
   */
  static new(name: string, date_type: FieldType, is_required: boolean): FieldInfo;
  /**
   * @returns {string}
   */
  name(): string;
  /**
   * @returns {FieldType}
   */
  date_type(): FieldType;
  /**
   * @returns {boolean}
   */
  is_required(): boolean;
}
