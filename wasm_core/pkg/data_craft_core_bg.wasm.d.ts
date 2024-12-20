/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function data_craft_init(): void;
export function __wbg_dataset_free(a: number, b: number): void;
export function dataset_load_from_csv(a: number, b: number): Array;
export function dataset_fields(a: number): Array;
export function dataset_add_field(a: number, b: number): void;
export function dataset_update_field(a: number, b: number, c: number): void;
export function dataset_swap_fields(a: number, b: number, c: number): void;
export function dataset_remove_field(a: number, b: number): void;
export function dataset_rows_count(a: number): number;
export function dataset_export_rows(a: number, b: number): number;
export function dataset_slice(a: number, b: number, c: number): number;
export function dataset_aggregate_rows(a: number, b: number, c: number): number;
export function dataset_group_rows(a: number, b: number, c: number, d: number): number;
export function dataset_distinct_values(a: number, b: number, c: number): number;
export function dataset_filter_values(a: number, b: number, c: number): number;
export function dataset_add_row(a: number, b: number): void;
export function dataset_update_row(a: number, b: number, c: number): void;
export function dataset_swap_rows(a: number, b: number, c: number): void;
export function dataset_remove_rows(a: number, b: number): void;
export function __wbg_fieldfilter_free(a: number, b: number): void;
export function __wbg_get_fieldfilter_min_value(a: number): Array;
export function __wbg_set_fieldfilter_min_value(a: number, b: number, c: number): void;
export function __wbg_get_fieldfilter_max_value(a: number): Array;
export function __wbg_set_fieldfilter_max_value(a: number, b: number, c: number): void;
export function __wbg_get_fieldfilter_values(a: number): Array;
export function __wbg_set_fieldfilter_values(a: number, b: number, c: number): void;
export function __wbg_get_fieldfilter_pattern(a: number): Array;
export function __wbg_set_fieldfilter_pattern(a: number, b: number, c: number): void;
export function fieldfilter_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function __wbg_fieldinfo_free(a: number, b: number): void;
export function fieldinfo_new(a: number, b: number, c: number, d: number): number;
export function fieldinfo_name(a: number): Array;
export function fieldinfo_date_type(a: number): number;
export function fieldinfo_is_required(a: number): number;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function __externref_table_dealloc(a: number): void;
export function __externref_drop_slice(a: number, b: number): void;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __externref_table_alloc(): number;
export function __wbindgen_exn_store(a: number): void;
export function __wbindgen_start(): void;
