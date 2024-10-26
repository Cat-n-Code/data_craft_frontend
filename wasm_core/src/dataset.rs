use std::io::Cursor;

use js_sys::Array;
use polars::{
    frame::DataFrame,
    io::SerReader,
    prelude::{AnyValue, CsvParseOptions, CsvReadOptions, DataType},
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

        let df = CsvReadOptions::default()
            .with_parse_options(CsvParseOptions {
                truncate_ragged_lines: true,
                try_parse_dates: true,
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

    pub fn add_field(&mut self, info: FieldInfo) {
        // let dt: DateType = info.date_type().into();

        // let series: Series;
        // if info.is_required() {
        //     series = Series::new_empty(info.name().into(), &info.date_type().into());
        // } else {
        //     series = Series::new_null(info.name().into(), &info.date_type().into());
        // }

        // self.df.with_column(lit())

        todo!()
    }

    pub fn update_field(&mut self, index: usize, info: FieldInfo) {
        todo!()
    }

    pub fn swap_fields(&mut self, old_index: usize, new_index: usize) {
        todo!()
    }

    pub fn remove_field(&mut self, index: usize) {
        let _ = self
            .df
            .drop_in_place(&self.df.get_columns()[index].name().clone())
            .unwrap();
    }
    // endregion: Fields

    // region: Rows
    pub fn rows_count(&self) -> usize {
        self.df.height()
    }

    pub fn slice(&self, start: usize, end: usize) -> Array {
        let rows = Array::new();
        for _ in start..end {
            rows.push(&Array::new());
        }

        for col in self.df.get_columns() {
            let slice = col.slice(start as i64, end - start);
            for (i, v) in slice.iter().enumerate() {
                let val = match v {
                    AnyValue::String(s) => s.into(),
                    AnyValue::UInt8(i) => i.into(),
                    AnyValue::UInt16(i) => i.into(),
                    AnyValue::UInt32(i) => i.into(),
                    AnyValue::UInt64(i) => i.into(),
                    AnyValue::Int8(i) => i.into(),
                    AnyValue::Int16(i) => i.into(),
                    AnyValue::Int32(i) => i.into(),
                    AnyValue::Int64(i) => i.into(),
                    AnyValue::Float32(f) => f.into(),
                    AnyValue::Float64(f) => f.into(),
                    // TODO: datetime types
                    _ => JsValue::null(),
                };
                let arr_value = rows.get(i as u32);
                let arr: &Array = arr_value.unchecked_ref();
                arr.push(&val);
            }
        }

        rows
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
