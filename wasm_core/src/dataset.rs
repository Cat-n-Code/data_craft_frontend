use std::io::Cursor;

use js_sys::Array;
use polars::{
    frame::DataFrame,
    io::SerReader,
    prelude::{CsvParseOptions, CsvReadOptions, DataType},
};
use wasm_bindgen::prelude::*;

use crate::field::{FieldInfo, FieldType};

#[wasm_bindgen]
pub struct Dataset {
    fields: Vec<FieldInfo>,
    df: DataFrame,
}

#[wasm_bindgen]
impl Dataset {
    pub fn load_from_csv(blob: &[u8]) -> Result<Self, JsValue> {
        let cursor = Cursor::new(blob);

        let df: DataFrame = CsvReadOptions::default()
            .with_parse_options(CsvParseOptions {
                truncate_ragged_lines: true,
                ..Default::default()
            })
            .into_reader_with_file_handle(cursor)
            .finish()
            .map_err(|err| JsValue::from_str(&err.to_string()))?;

        let mut fields = Vec::new();
        for col in df.get_columns() {
            let field_type = match col.dtype() {
                DataType::UInt8
                | DataType::UInt16
                | DataType::UInt32
                | DataType::UInt64
                | DataType::Int8
                | DataType::Int16
                | DataType::Int32
                | DataType::Int64 => FieldType::Integer,
                DataType::Float32 | DataType::Float64 => FieldType::Float,
                DataType::String => FieldType::Text,
                DataType::Date => FieldType::Date,
                DataType::Time => FieldType::Time,
                DataType::Datetime(u, name) => FieldType::DateTime,
                _ => {
                    return Err("Unsupported data type".into());
                }
            };

            fields.push(FieldInfo::new(
                col.name().clone().into_string(),
                field_type,
                !col.has_nulls(),
            ));
        }

        Ok(Self { fields, df })
    }

    // region: Fields
    pub fn fields(&self) -> Vec<FieldInfo> {
        self.fields.clone()
    }

    pub fn add_field(&self, info: FieldInfo) {
        todo!()
    }

    pub fn update_field(&self, index: usize, info: FieldInfo) {
        todo!()
    }

    pub fn swap_fields(&self, old_index: usize, new_index: usize) {
        todo!()
    }

    pub fn remove_field(&self, index: usize) {
        todo!()
    }
    // endregion: Fields

    // region: Rows
    pub fn rows_count(&self) -> usize {
        todo!()
    }

    pub fn slice(&self, start: usize, end: usize) -> Array {
        todo!()
    }

    pub fn add_row(&self, data: Array) {
        todo!()
    }

    pub fn update_row(&self, index: usize, data: Array) {
        todo!()
    }

    pub fn swap_rows(&self, old_index: usize, new_index: usize) {
        todo!()
    }

    pub fn remove_rows(&self, indexes: Array) {
        todo!()
    }
    // endregion: Rows
}
